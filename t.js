// more experments
const fs = require("fs");
const localstorage = JSON.parse(fs.readFileSync("localStorage.json", "utf8"));
console.log(JSON.parse(localstorage[4].value).value.filter(e=>e.shipType == "update"))