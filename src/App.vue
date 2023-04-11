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
        <CombatTab v-if="ActiveTab=='combat'" :gameData="gameData" @event="handleEvent"/>
        <ShelterTab v-if="ActiveTab=='shelter'" :gameData="gameData" @event="handleEvent"/>
        <TabletTab v-if="ActiveTab=='tablet'" :gameData="gameData" @event="handleEvent"/>
        <EquipmentTab v-if="ActiveTab=='equipment'" :gameData="gameData" @event="handleEvent"/>
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
// Tabs
import MainTab from './components/Tabs/MainTab.vue'
import MedicalTab from './components/Tabs/MedicalTab.vue'
import CombatTab from './components/Tabs/CombatTab.vue'
import ShelterTab from './components/Tabs/ShelterTab.vue'
import TabletTab from './components/Tabs/TabletTab.vue'
import EquipmentTab from './components/Tabs/EquipmentTab.vue'

// Other components
import SideBar from './components/SideBar.vue'
import Settings from './components/Settings.vue'
import MessageLog from './components/MessageLog.vue'
import ModalTemplates from './components/ModalTemplates.vue'
import Popup from './components/Popup.vue'

// Seperate scripts
import cypher from './cypher.js'
import globalVars from './globalVars.js'
import combat from './combat.js'

export default {
  name: 'App',

  components: {
    MainTab,
    MedicalTab,
    CombatTab,
    ShelterTab,
    TabletTab,
    EquipmentTab,

    SideBar,
    Settings,
    MessageLog,
    ModalTemplates,
    Popup,
  },

  mounted(){
    
    // Initialize playerStats
    this.initializeComputed()

    this.defaultGameData = JSON.parse(JSON.stringify(this.gameData))
    this.loadGame('none')

    // Initialize playerStats
    this.initializeComputed()

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
    }, 10)
    
  },

  data(){
    return {
      gameData: { // everything that will be saved (and their default values)
        sidebarOn: true, // is sidebar visible?
        exp: 0,
        hour: 0, 
        day: 0,
        year: 0,
        name: 'janY',
        health: 10,
        maxHealth: 10,
        actions: 1,
        maxActions: 1,
        mainButtonProgress: 0, // obsolete
        currentActivity: null,
        armorClass: 5,
        equipment:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{title: "knife", type: "weapon", subtype: "melee",rarity: 2,mods:{nouns: [{id:"knife",description:["", "% chance to inflict ", " bleed for ", " seconds"], minRoll:[40, 1, 4], maxRoll:[60, 2, 6], roll:[46, 1, 5], damageDice: "1d8", attackDice:"1d20"}],verbs:[{id:"rapid_attack"}],adjectives:[{id:"sharp", minRoll:[2], maxRoll:[6], roll:[4]}],},},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Inventory
        bodyModifiers:[],
        stats:{str:{value:5, name:'str'}, dex:{value:5, name:'dex'}, con:{value:5, name:'con'}, wis:{value:5, name:'wis'}},
        abilities:[
          {
            name:'Unarmed Attack',
            id:'unarmed_attack'
          },
        ],
        enemies:[{
          name: 'goblin',
          health: 10,
          maxHealth: 10,
          actionInterval: 6000,
          actions: 1,
          maxActions: 1,
          armorClass: 14,
          latestAttack: null,
          stats:{
            str:{
              value: 2,
              name: 'str',
            },
            dex:{
              value: 4,
              name: 'dex',
            },
            con:{
              value: 1,
              name: 'con',
            },
            wis:{
              value: 1,
              name: 'wis',
            },
          }, 
          animations: {
            hurt: false,
            dodge: false,
          }
        },],
        stats: null,
        areaInfo: {
          areaId: 'grassland',
          areaTitle: 'The Grassland',
        },
        statistics:{
          realTimePlayed: 0, // in miliseconds
        },
        purchased:{
          
        },
        animations:{
          hurt: false,
          dodge: false,
        },
      },
      defaultGameData: {},
      ActiveTab: "combat",
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
        case 'ability':
          this.performAction(this.gameData, this.gameData.enemies[0], event.ability)
          break
      }
    },

    performAction(attacker, defender, action){
      if (attacker.actions >= 1){
        console.log("performing " + action)
        attacker.actions = 0
        attacker.latestAttack = combat.attemptAttack(this.gameData, this.gameData.enemies[0], action)
        this.gameData.enemies[0].health -= attacker.latestAttack.damage
        if (attacker.latestAttack.damage > 0){
          this.doAnimation(this.gameData.enemies[0], "hurt")
        }
        
      }
    },

    initializeComputed(){
      this.gameData.stats = this.playerStatsCalc
      this.gameData.maxHealth = this.playerMaxHealthCalc
      this.gameData.armorClass = this.playerArmorClassCalc
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
      
      // regenerates player actions
      if(this.gameData.actions < this.gameData.maxActions) {
        this.gameData.actions += (miliseconds/this.playerActionInterval)
      }

      // regenerates enemy actions
      for(var enemy in this.gameData.enemies){
        if(enemy.actions < enemy.maxActions) {
          enemy.actions += (miliseconds/enemy.actionInterval)
        }
      }

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

    doAnimation(creature, animation) { // performs an animation for creature (if already playing, then stop and start over)
      if (creature.animations[animation] == true){
        creature.animations[animation] = false
      }
      var intervalAnimation = animation.concat("Interval")
      setTimeout( () => {
        creature.animations[animation] = true
        clearInterval(creature.animations[intervalAnimation])
        creature.animations[intervalAnimation] = setTimeout(() => {
          creature.animations[animation] = false
        }, globalVars.animationDuration[animation])
      }, 10)
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
      this.gameData.purchased.tempStr += 1
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

    // Update stats
    playerStatsCalc(newVal, oldVal){
      this.gameData.stats = newVal
    },

    playerMaxHealthCalc(newVal, oldVal){
      this.gameData.maxHealth = newVal
    },

    playerArmorClassCalc(newVal, oldVal){
      this.gameData.armorClass = newVal
    }

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
  
    playerStatsCalc(){ // STR, DEX, CON, WIS...
      return {str:{value:5, name:'str'}, dex:{value:5, name:'dex'}, con:{value:5, name:'con'}, wis:{value:5, name:'wis'}}
    },

    playerMaxHealthCalc(){
      return 10
    },

    playerArmorClassCalc(){
      if (this.gameData.stats != undefined){
        return (5 + this.gameData.stats.dex.value)
      }
      return -1
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

    playerActionInterval(){
      return globalVars.baseActionInterval
    }

  },

}
</script>

<style>
</style>
