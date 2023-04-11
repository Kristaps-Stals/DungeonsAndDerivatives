const globalVars = {
  baseTimeInterval:1000,
  hoursInDay:24,
  daysInYear:360,
  baseActionInterval:6000, // in ms
  mainButtonBaseProgressPerHour: 25, // obsolete

  sideTabButtons: [
    {label: "Combat", tab: "combat"},
    {label: "Equipment", tab: "equipment"},
    {label: "Scrapyard", tab: "main"}, // obsolete
    {label: "Medical", tab: "medical"}, 
    {label: "Shelter", tab: "shelter"},
    {label: "Tablet", tab: "tablet"},
  ],

  animationDuration: { // in ms
    hurt:500
  }
}

export default globalVars