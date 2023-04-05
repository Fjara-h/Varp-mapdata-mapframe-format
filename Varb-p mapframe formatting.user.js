// ==UserScript==
// @name        Varb/p mapframe formatting
// @namespace   Violentmonkey Scripts
// @match       https://chisel.weirdgloop.org/varbs/mapdata
// @grant       none
// @version     1.0
// @author      Fjara
// @description Format varb/p changes to mapframe for wiki
// ==/UserScript==

fullText = document.getElementsByTagName('pre')[0].textContent;
locs = fullText.split('location');

let output = "\<mapframe width=\"full\" height=740 zoom=-3 mapid=-1 plane=0 x=5400 y=5848 align=\"center\"\>\n" + "{\n  \"type\": \"FeatureCollection\",\n  \"features\": [\n"

locs.forEach((loc) => {
  if(!loc.includes("\"y\"")){
    return;
  }
  let y = loc.match(/y\": (\d+)/)[1];
  let x = loc.match(/x\": (\d+)/)[1];
  let plane = loc.match(/plane\": (\d+)/)[1];
  output = output + "     {\n      \"type\": \"Feature\",\n      \"properties\": {\n        \"providerID\": 1,\n        \"icon\": \"redPin\",\n        \"mapID\": -1,\n        \"plane\": " + plane + "\n      },\n      \"geometry\": {\n        \"type\": \"Point\",\n        \"coordinates\": [\n          " + x + ", " + y + ", 0\n        ]\n      }\n    },\n"
});

output = output + "  ]\n}" + "\n\</mapframe\>"

textarea = document.createElement("textarea");
textarea.rows = 50;
textarea.cols = 200;
textarea.setAttribute("wrap", "off");
textarea.readOnly = true;
textarea.value = output;
document.body.appendChild(textarea);


console.log(output)