// connection
var axios = require('axios');
var instance = axios.create({
    baseURL: 'http://localhost:80/',
    timeout: 10000
});


// util functions
const MODE_MAP = { "000": "DRV", "001": "REV", "010": "LFT", "011": "RGT", "100": "PRK" };
const prettyNum = (numstr) => {
    if (!numstr) return numstr;
    if (numstr.length < 5) return numstr;
    numstr = numstr.substr(0, 5);
    return numstr;
}

// display functions
const diplayMode = (dataAry, dataObj) => {
    try {
        dataObj["mode"] = MODE_MAP[dataAry[0]];
    }
    catch {
        dataObj["mode"] = "ERR";
    }
}

const displayNumber = (dataAry, dataObj) => {
    dataObj["acoustic"] = prettyNum(dataAry[1]);
    dataObj["radio"] = prettyNum(dataAry[2]);
    dataObj["infrared"] = prettyNum(dataAry[3]);
    dataObj["magnetic"] = prettyNum(dataAry[4]);
}

const displayRock = (dataAry, dataObj) => {
    // Actual Parameters
    let infrared353 = (Number(dataAry[3]) > 250) && (Number(dataAry[3]) < 500);
    let infrared571 = (Number(dataAry[3]) > 420) && (Number(dataAry[3]) < 720);
    let radio151 = true;
    let radio239 = true;
    let acoustic40 = (Number(dataAry[1]) > 8);
    let magneticUp = true;
    let magneticDown = true;

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
function drive() {
    try { instance.get('/forward'); }
    catch (e) { throw new Error("axios cannot connect to target address"); }
}

function reverse() {
    try { instance.get('/reverse'); }
    catch (e) { throw new Error("axios cannot connect to target address"); }
}

function left() {
    try { instance.get('/left-turn'); }
    catch (e) { throw new Error("axios cannot connect to target address"); }
}

function right() {
    try { instance.get('/right-turn'); }
    catch (e) { throw new Error("axios cannot connect to target address"); }
}

function end() {
    try { instance.get('/end'); }
    catch (e) { throw new Error("axios cannot connect to target address"); }
}

// return data dump
async function sensors() {
    // actual response
    let response;
    try {
        response = await instance.get('/sensors');
    }
    catch (e) {
        throw new Error("axios cannot connect to target address");
    }

    // sample response
    // let response;
    // response = { data: "100,0.9876153528043081,0.3555515390782771,0.30116497482281646,0.8490366708833055,0" };

    let dataAry = (response.data).split(',');
    let dataObj = {};
    // pre-process
    displayTime(dataAry, dataObj);
    diplayMode(dataAry, dataObj);
    displayNumber(dataAry, dataObj);
    // rock detection
    displayRock(dataAry, dataObj);
    // return
    console.log(dataObj);
    return dataObj;
}


// exports
module.exports = {
    drive,
    reverse,
    left,
    right,
    end,
    sensors
}