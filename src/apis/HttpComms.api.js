// connection
var axios = require('axios');
var demo = false;
var instance = axios.create({
    baseURL: (demo ? 'http://localhost:80/' : 'http://192.168.0.17:80/'),
    timeout: 5000
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
      proposed = numstr.substring(0, 4);
    }
    return proposed;
}

// display functions
const displayNumber = (dataAry, dataObj) => {
    console.log("num");
    dataObj["voltage"] = prettyNum(dataAry[0]);
    dataObj["acoustic"] = prettyNum(dataAry[1]);
    dataObj["radio"] = prettyNum(dataAry[2]);
    dataObj["infrared"] = prettyNum(dataAry[3]);
    dataObj["magnetic"] = prettyNum(String((Number(dataAry[4])*0.001953)-1));
}

const displayRock = (dataAry, dataObj) => {
    console.log("rock");
    // Actual Parameters
    let infrared353 = (Number(dataAry[3]) <= 400);
    let infrared571 = (Number(dataAry[3]) > 400);
    let radio151 = (Number(dataAry[2]) > 130) && (Number(dataAry[2]) < 160);
    let radio239 = (Number(dataAry[2]) > 200);
    let radio = (radio151 || radio239);
    let acoustic40 = (Number(dataAry[1]) > 1000);
    let magneticUp = (radio ? Number(dataAry[4]) < 770 : Number(dataAry[4]) < 500);
    let magneticDown = (radio ? Number(dataAry[4]) > 850 : Number(dataAry[4]) > 560);

    // Sample Parameters: Netherite
    // let infrared353 = false;
    // let infrared571 = true;
    // let radio151 = false;
    // let radio239 = false;
    // let acoustic40 = true;
    // let magneticUp = false;
    // let magneticDown = false;

    // Inferred Parameters
    // let noRadio = (infrared353 || infrared571);
    // let noInfrared = (!infrared353 && !infrared571);
    // let noAcoustic = (!acoustic40);
    // let noMagnetic = (!magneticUp && !magneticDown);

    let noRadio = !(radio151 || radio239);
    let noInfrared = (!infrared353 && !infrared571);
    let noAcoustic = (!acoustic40);
    let noMagnetic = (!magneticUp && !magneticDown);

    // Decision Tree (No Inference)
    if (radio151 && acoustic40 ) dataObj["rock"] = "GABORIUM";
    else if (radio151 && magneticUp) dataObj["rock"] = "ADAMANTINE";
    else if (radio239 && magneticDown) dataObj["rock"] = "XIRANG";
    else if (radio239) dataObj["rock"] = "LATHWAITE";
    else if ((infrared353 || noRadio) && noAcoustic) dataObj["rock"] = "THIOTIMOLINE";
    else if ((infrared571 || noRadio) && acoustic40) dataObj["rock"] = "NETHERITE";
    else dataObj["rock"] = null;
}

// const displayRock = (dataAry, dataObj) => {
//     let voltage = Number(dataAry[0]);
//     let acoustic = Number(dataAry[1]);
//     let radio = Number(dataAry[2]);
//     let infrared = Number(dataAry[3]);
//     let magnetic = Number(dataAry[4]);

//     if ((radio > 130) && (radio < 160)) {
//         if ((magnetic > 770) && (magnetic) < 850) {
            
//         }
//     }
//     else {
        
//     } 

// }

const displayTime = (dataAry, dataObj) => {
    console.log("time");
    dataObj["time"] = Number(dataAry[5]);
}

// return state
export async function forward() {
    let start = performance.now();
    let response = await instance.get('/forward');
    let finish = performance.now();
    return { duration: String(((finish-start).toFixed(5))).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] };
}

export async function reverse() {
    let start = performance.now();
    let response = await instance.get('/reverse');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] };    
}

export async function rotateLeft() {
    let start = performance.now();
    let response = await instance.get('/rotate-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function rotateRight() {
    let start = performance.now();
    let response = await instance.get('/rotate-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function forwardLeft() {
    let start = performance.now();
    let response = await instance.get('/forward-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function forwardRight() {
    let start = performance.now();
    let response = await instance.get('/forward-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function reverseLeft() {
    let start = performance.now();
    let response = await instance.get('/reverse-left');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function reverseRight() {
    let start = performance.now();
    let response = await instance.get('/reverse-right');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

export async function end() {
    let start = performance.now();
    let response = await instance.get('/end');
    let finish = performance.now();
    return { duration: String((finish-start).toFixed(5)).substr(0, 5), mode: prettyMode[response.data][0], abbrev: prettyMode[response.data][1] }; 
}

// return data dump
export async function sense() {
    // actual response
    let response;
    response = await instance.get('/sensors');

    // sample response
    // let response;
    // response = { data: "100,0.9876153528043081,0.3555515390782771,0.30116497482281646,0.8490366708833055,0" };

    let dataAry = (response.data).split(',');
    let dataObj = {};

    try {
        // pre-process
        displayTime(dataAry, dataObj);
        displayNumber(dataAry, dataObj);
        // rock detection
        displayRock(dataAry, dataObj);
    }
    catch (e) {
        console.error(e);
    }

    // return
    return dataObj;
}


// exports
// module.exports = {
//     sense,
//     forward,
//     reverse,
//     rotateLeft,
//     rotateRight,
//     forwardLeft,
//     forwardRight,
//     reverseLeft,
//     reverseRight,
//     end
// }