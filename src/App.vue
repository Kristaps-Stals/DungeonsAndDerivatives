<template>
  <div class="slowfadein text-white">
    <!-- Main flexbox -->
    <div class="absolute flex h-full w-full" >
      <!-- Sidebar -->
      <div v-if="gameData['sidebarOn']" >
        <SideBar @switchTab="switchTab"/>
      </div>
      <!-- Main area -->
      <div class="flex-1 relative h-full text-white">
        <MainTab v-if="ActiveTab=='main'" :gameData="gameData" @event="handleEvent"/>
        <MedicalTab v-if="ActiveTab=='medical'" :gameData="gameData" @event="handleEvent"/>
        <ShelterTab v-if="ActiveTab=='shelter'" :gameData="gameData" @event="handleEvent"/>
        <TabletTab v-if="ActiveTab=='tablet'" :gameData="gameData" @event="handleEvent"/>
        <Settings v-if="ActiveTab=='settings'" @settingClicked="handleSettingClicked"/>
      </div>
    </div>
    <!-- Bottom left grid -->
    <div class="absolute grid grid-flow-col" style="top:100%;transform: translateY(-100%);">
      <!-- Side bar toggle btn -->
      <button class="btn-utility" @click="toggleSidebar">
        <span v-if="gameData['sidebarOn']">&lt;</span>
        <span v-else>&gt;</span>
      </button>
      <!-- Settigns button -->
      <button class="btn-utility" @click="switchTab('settings')">
        <span>S</span>
      </button>
    </div>

    <!-- Top right-->
    <div v-if="totalHoursPassed>60" class="absolute text-xl grid slowfadein" style="left:99%; top:2%; width:25%; transform: translateX(-100%);">
      <!-- Top right time -->
      <p class="h-8 text-center ">Year {{ gameData.year }} ({{ season }}) - Day {{ gameData.day }} - Hour {{ gameData.hour }}</p>
      <!-- Activity display -->
      <p class="h-8 text-center ">{{ activityDisplay }}</p>
      <!-- Energy display -->
      <p v-if="gameData.statistics.bestEnergy >= 1" class="h-8 text-center text-blue-300">{{ gameData.currentEnergy }} / {{ maxEnergy }} Energy</p>
    </div>

    <!-- message log -->
    <MessageLog v-if="logMessages.length>0" :logMessages="logMessages"/>
    
    
    <!-- Modal -->
    <ModalTemplates v-if="modalOn" :modalType="modalType" :importString="importString" @modalClick="handleModal"/>

    <!-- Popup -->
    <Popup :popupMessages="popupMessages"/>
    

  </div>
</template>

<script>
import MainTab from './components/Tabs/MainTab.vue'
import MedicalTab from './components/Tabs/MedicalTab.vue'
import ShelterTab from './components/Tabs/ShelterTab.vue'
import TabletTab from './components/Tabs/TabletTab.vue'

import SideBar from './components/SideBar.vue'
import Settings from './components/Settings.vue'
import MessageLog from './components/MessageLog.vue'
import ModalTemplates from './components/ModalTemplates.vue'
import Popup from './components/Popup.vue'
import cypher from './cypher.js'
import globalVars from './globalVars.js'

export default {
  name: 'App',

  components: {
    MainTab,
    MedicalTab,
    ShelterTab,
    TabletTab,

    SideBar,
    Settings,
    MessageLog,
    ModalTemplates,
    Popup,
  },

  mounted(){
    this.defaultGameData = JSON.parse(JSON.stringify(this.gameData))
    this.loadGame('none')
    // autosave game every 30s
    setInterval(() => {
      this.saveGame()
    }, 30000);
    this.setGameLoop(this.timeSpeed, 1)

    var date = new Date()
    // Updates real time
    setInterval(() => {
      var nextDate = new Date()
      this.passRealTime(nextDate.getTime()-date.getTime())
      date = nextDate
    }, 16)
  },

  data(){
    return {
      gameData: { // everything that will be saved (and their default values)
        sidebarOn: true, // is sidebar visible?
        scrap: 0, // player scrap amount
        hour: 0, 
        day: 0,
        year: 0,
        searchPoints: 0,
        mainButtonProgress: 0,
        currentActivity: null,
        bodyModifiers:[],
        currentEnergy: 0,
        statistics:{
          bestScrap: 0,
          bestEnergy: 0,
          realTimePlayed: 0, // in miliseconds
        }
      },
      defaultGameData: {},
      ActiveTab: "main",
      timePassInterval: null,
      logMessages: [],
      popupMessages: [],
      modalOn: false,
      modalType: null,
      importString: '',
      deleteTest: null,
    }
  },

  methods: {
    handleEvent(event){
      switch(event.message){
        case 'mainButtonClick':
          this.mainButtonClick()
          break
      }
    },

    mainButtonClick(){
      if(this.gameData.currentActivity == null){
        this.gameData.currentActivity = 'main_button'
      }
    },

    toggleSidebar(){
      this.gameData['sidebarOn']=!this.gameData['sidebarOn']
    },

    switchTab(newTab){
      this.ActiveTab = newTab
    },
    
    setGameLoop(interval, bulk){
      clearInterval(this.timePassInterval)
      this.timePassInterval = setInterval(() => {
        this.passTime(bulk)
      }, interval)
    },

    passRealTime(miliseconds){
      this.gameData.statistics.realTimePlayed += miliseconds
    },

    // Saves game
    saveGame(){
      let data = JSON.stringify(this.gameData)
      data = cypher.encrypt(data)
      localStorage.setItem('saveData', data)
      this.pushPopup("Game saved!")
    },

    // Loads game (if loadType is 'none' then loads from localstorage, if 'import' then from inString)
    loadGame(loadType, inString){
      var data
      // Extracts the data
      if (loadType == "none"){
        data = cypher.decrypt(localStorage.getItem('saveData'))
      } else if (loadType == "import") {
        data = cypher.decrypt(inString)
        this.handleModal({message:'exit'})
        this.importString = ''
      }

      // Tries to assign data
      try{
        this.gameData = JSON.parse(data)
        this.loadDefaultData(this.gameData, this.defaultGameData)
        this.logMessages = []
        this.pushPopup("Game loaded!")
      } catch(e){
        console.log(e)
      }
    },

    // Makes sure that all data is assigned
    loadDefaultData(dataObject, defaultDataObject){
      for (var data in defaultDataObject){ // if no data in savefile then copy from default
        if (dataObject[data] == null) {
          dataObject[data] = defaultDataObject[data]
        }
        if (typeof dataObject[data] === 'object' && !Array.isArray(dataObject[data]) && dataObject[data] !== null){
          this.loadDefaultData(this.gameData[data], this.defaultGameData[data])
        }
      }
    },

    setImportString(inString){
      this.importString = inString
    },

    handleSettingClicked(message){
      switch(message){
        case "savegame":
          this.saveGame()
          break
        case "exportgame":
          this.exportGame()
          break
        case "importgame":
          this.modalType = 'importgame'
          this.modalOn = true
          break
        case "deletegame":
          this.modalType = 'deletegame'
          this.modalOn = true
          break
      }
    },

    handleModal(event){
      switch(event.message){
        case 'exit':
          this.resetModal()
          break
        case 'load':
          this.loadGame('import', event.secondaryMessage)
          break
        case 'delete':
          this.deleteGame()
          break
      }
    },  

    exportGame(){
      this.saveGame()
      this.pushPopup("Copied to clipboard!")
      navigator.clipboard.writeText(localStorage.getItem('saveData'))
    },

    deleteGame(){
      this.gameData = JSON.parse(JSON.stringify(this.defaultGameData))
      this.pushPopup("Game deleted!")
      this.saveGame()
      this.resetModal()
    },

    resetModal(){
      this.modalOn = false
      this.modalType = null
    },

    // Completes amountHours hours
    passTime(amountHours){
      this.incrementTime(amountHours)

      // progress main button if it is active
      if (this.gameData.currentActivity == 'main_button') {
        this.gameData.mainButtonProgress += globalVars.mainButtonBaseProgressPerHour
      }

      // check if main button is done
      if (this.gameData.mainButtonProgress >= 100) {
        setTimeout(() => {
          this.doMainButton(Math.floor(this.gameData.mainButtonProgress/100))
          this.gameData.mainButtonProgress = 0
          this.gameData.currentActivity = null
        }, 200);
      }

    },

    // activates when button is finished
    doMainButton(amount){
      this.gameData.scrap += 1
      this.pushPopup("You found 1 scrap")
    },

    // Increments displayed time
    incrementTime(amountHours){
      var tempHours = this.gameData.hour + amountHours
      this.gameData.hour = tempHours % globalVars.hoursInDay
      var tempDays = this.gameData.day + Math.floor(tempHours/globalVars.hoursInDay)
      this.gameData.day = tempDays % globalVars.daysInYear
      var tempYears = this.gameData.year + Math.floor(tempDays/globalVars.daysInYear)
      this.gameData.year = tempYears
    },

    pushLog(message){
      var timestamp = ''.concat(this.gameData.year, '-', this.gameData.day, '-', this.gameData.hour)
      this.logMessages.push({message:message,timestamp:timestamp})
    },

    pushPopup(message){
      this.popupMessages.push({message:message})
      setTimeout(() => {
        this.popupMessages.shift()
      }, 3500);
    }
  },


  watch: {
    timeSpeed(newVal, oldVal){
      this.setGameLoop(newVal, 1)
    },

    // Update statistics
    'gameData.scrap'(newVal, oldVal){
      this.gameData.statistics.bestScrap = Math.max(this.gameData.statistics.bestScrap, newVal)
    },

    'gameData.energy'(newVal, oldVal){
      this.gameData.statistics.bestEnergy = Math.max(this.gameData.statistics.bestEnergy, newVal)
    }, 
  },

  computed: {
    timeSpeed(){ // measured in ms per hour
      return globalVars.baseTimeInterval
    },

    season(){
      if (this.gameData.day < globalVars.daysInYear/4){
        return "spring"
      } else if (this.gameData.day < globalVars.daysInYear/2){
        return "summer"
      } else if (this.gameData.day < (globalVars.daysInYear/4)*3){
        return "fall"
      } else {
        return "winter"
      }
      
    },

    activityDisplay(){
      switch(this.gameData.currentActivity){
        case null:
          return 'No activity'
        case 'main_button':
          return 'Searching'
      }
      return 'failed to find activity'
    },

    totalHoursPassed(){
      return this.gameData.hour + (this.gameData.day * globalVars.hoursInDay) + (this.gameData.year * globalVars.hoursInDay * globalVars.daysInYear)
    },

    maxEnergy(){
      return globalVars.baseMaxEnergy
    }
  },

}
</script>

<style>
</style>
