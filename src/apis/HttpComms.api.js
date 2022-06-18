// connection
var axios = require('axios');
var demo = false;
var instance = axios.create({
    baseURL: (demo ? 'http://localhost:80/' : 'http://192.168.0.17:80/'),
    timeout: 10000
});


// util functions
const prettyMode = { 
    "FORWARD": ["DRV", "D"], 
    "REVERSE": ["REV", "R"], 
    "ROTATE LEFT": ["LFT", "L"], 
    "ROTATE RIGHT": ["RGT", "R"], 
    "FORWARD LEFT": ["DWL", "DL"],
    "FORWARD RIGHT": ["DWR", "DR"],
    "REVERSE LEFT": ["RVL", "RL"],
    "REVERSE RIGHT": ["RVR", "RR"],
    "END": ["PRK", "P"] 
};
const prettyNum = (numstr) => {
    let proposed = numstr.substring(0, 5);
    if (proposed[4] === ".") {
      proposed = numstr.substring(0, 6);
    }
    return proposed;
}

// display functions
const displayNumber = (dataAry, dataObj) => {
    dataObj["voltage"] = prettyNum(dataAry[0]);
    dataObj["acoustic"] = prettyNum(dataAry[1]);
    dataObj["radio"] = prettyNum(dataAry[2]);
    dataObj["infrared"] = prettyNum(dataAry[3]);
    dataObj["magnetic"] = prettyNum(dataAry[4]);
}

const displayRock = (dataAry, dataObj) => {
    // Actual Parameters
    let infrared353 = (Number(dataAry[3]) > 300) && (Number(dataAry[3]) < 450);
    let infrared571 = (Number(dataAry[3]) > 450) && (Number(dataAry[3]) < 650);
    let radio151 = (Number(dataAry[2]) > 100) && (Number(dataAry[2]) < 200);
    let radio239 = (Number(dataAry[2]) > 200) && (Number(dataAry[2]) < 300);
    let acoustic40 = (Number(dataAry[1]) > 40);
    let magneticUp = (Number(dataAry[4]) > 400);
    let magneticDown = (Number(dataAry[4]) < 200);

    // Sample Parameters: Netherite
    // let infrared353 = false;
    // let infrared571 = true;
    // let radio151 = false;
    // let radio239 = false;
    // let acoustic40 = true;
    // let magneticUp = false;
    // let magneticDown = false;

    // Inferred Parameters
    let noRadio = (!radio151 && !radio239);
    let noInfrared = (!infrared353 && !infrared571);
    let noAcoustic = (!acoustic40);
    let noMagnetic = (!magneticUp && !magneticDown);

    // Decision Tree (No Inference)
    if (radio151 && noInfrared && acoustic40 && noMagnetic) dataObj["rock"] = "GABORIUM";
    else if (radio239 && noInfrared && noAcoustic && noMagnetic) dataObj["rock"] = "LATHWAITE";
    else if (radio151 && noInfrared && noAcoustic && magneticUp) dataObj["rock"] = "ADAMANTINE";
    else if (radio239 && noInfrared && noAcoustic && magneticDown) dataObj["rock"] = "XIRANG";
    else if (noRadio && infrared353 && noAcoustic && noMagnetic) dataObj["rock"] = "THIOTIMOLINE";
    else if (noRadio && infrared571 && acoustic40 && noMagnetic) dataObj["rock"] = "NETHERITE";
    else dataObj["rock"] = null;
}

const displayTime = (dataAry, dataObj) => {
    dataObj["time"] = Number(dataAry[5]);
}

// return state
async function forward() {
    let start = performance.now();
    let response = await instance.get('/forward');
    let finish = performance.now();
    return { duration: String(((finish-start).toFixed(5))).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] };
}

async function reverse() {
    let start = performance.now();
    let response = await instance.get('/reverse');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] };    
}

async function rotateLeft() {
    let start = performance.now();
    let response = await instance.get('/rotate-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function rotateRight() {
    let start = performance.now();
    let response = await instance.get('/rotate-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function forwardLeft() {
    let start = performance.now();
    let response = await instance.get('/forward-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function forwardRight() {
    let start = performance.now();
    let response = await instance.get('/forward-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function reverseLeft() {
    let start = performance.now();
    let response = await instance.get('/reverse-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function reverseRight() {
    let start = performance.now();
    let response = await instance.get('/reverse-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

async function end() {
    let start = performance.now();
    let response = await instance.get('/end');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

// return data dump
async function sensors() {
    // actual response
    let response;
    response = await instance.get('/sensors');

    // sample response
    // let response;
    // response = { data: "100,0.9876153528043081,0.3555515390782771,0.30116497482281646,0.8490366708833055,0" };

    let dataAry = (response.data).split(',');
    let dataObj = {};
    // pre-process
    displayTime(dataAry, dataObj);
    displayNumber(dataAry, dataObj);
    // rock detection
    displayRock(dataAry, dataObj);
    // return
    console.log(dataObj);
    return dataObj;
}


// exports
module.exports = {
    forward,
    reverse,
    sensors,
    rotateLeft,
    rotateRight,
    forwardLeft,
    forwardRight,
    reverseLeft,
    reverseRight,
    end
}