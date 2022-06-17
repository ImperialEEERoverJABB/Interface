import { useEffect, useState } from "react";
import styled from "styled-components";

import { useKeyPress } from "../utils/KeyPress.util"

import { MissionClockDisplay } from "../components/MissionClockDisplay";
import { SensorDisplay } from "../components/SensorDisplay";
import { ConnectionDisplay } from "../components/ConnectionDisplay";
import { ClockDisplay } from "../components/ClockDisplay";
import { CommandKeyDisplay } from "../components/CommandKeyDisplay";
import { RockModal } from "../components/RockModal";

import DummyImage from "../img/dummy-img-mars.png";

import { forward, reverse, end, sensors, forwardLeft, forwardRight, reverseLeft, reverseRight, rotateLeft, rotateRight } from "../apis/HttpComms.api";

var InternetFlag = false;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 100vh;
  background-image: url(${DummyImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 85vh;
  width: 95vw;
  margin:0;

  box-sizing: border-box;
  border-left: solid 2px white;
  border-right: solid 2px white;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 12px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 12px;
  
`;

const CommandContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;

  width: 95vw;
`;

const SensorModule = styled.div`
`;

const SensorDisplayWrapper = styled.div`
  margin-bottom: 12px;
`

const RoverModule = styled.div`
`;

const Label = styled.p`
  margin: 0;
  margin-top: 24px;
  color: white
`

export const MainContainer = () => {
  // display states
  const [connection, setConnection] = useState(null);
  const [start, setStart] = useState(null);
  const [stable, setStable] = useState(undefined);
  const [data, setData] = useState({});
  // function states
  const [intervalId, setIntervalId] = useState(null);
  
  // util functions
  const startSensing = () => {
    let inProgressFlag = false;
    var sensorIntervalId = setInterval(async () => {
      if (inProgressFlag) {
        return;
      }
      inProgressFlag = true;
      try {
        // try connecting
        let parsed = await sensors();

        // if connection successful and connection not set
        if (connection === null) {
          console.log(connection);
          // set connection state
          setConnection(true);
          // set start time
          let systemStart = new Date((new Date()).getTime() - parsed.time);
          setStart(systemStart);
          if (!InternetFlag) {
            InternetFlag = true;
            setStable(new Date());
          }
        }

        setData(parsed);
      }
      catch (e) {
        InternetFlag = false;
        setConnection(false);
        setIntervalId(null);
        clearInterval(sensorIntervalId);
      }
      inProgressFlag = false;
    }, 1000);

    setIntervalId(sensorIntervalId);
  }

  const stopSensing = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  // effect: repeat get sensor
  // hook
  useEffect(() => { 
    startSensing();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  // effect: key presses
  // keypresses
  let w = useKeyPress("w");
  let a = useKeyPress("a");
  let s = useKeyPress("s");
  let d = useKeyPress("d");
  let j = useKeyPress("j");
  // util function
  const keyPressedString = (w, a, s, d, j=false) => {
    let array = [];
    if (w) array.push("W");
    if (a) array.push("A");
    if (s) array.push("S");
    if (d) array.push("D");
    if (j) array.push("J");
    if (array.length === 0) return "";
    else if (array.length === 1) return array[0];
    else if (array.length === 2) return array[0] + " and " + array[1];
    else {
      let ans = "";
      for (let item of array) {
        if (item === array[array.length-1]) {
          ans += item;
        }
        else if (item === array[array.length-2]) {
          ans += (item + ", and ");
        }
        else {
          ans += (item + ", ")
        }
      }
      return ans;
    }
  }
  // command hook
  useEffect(() => {
    let num = w + a + s +d;
    if (num === 2) {
      if (w && a) {
        console.log("forwardLeft()");
        (async function() { setCommand(await forwardLeft()); }());
      }
      else if (w && d) {
        console.log("forwardRight()");
        (async function() { setCommand(await forwardRight()); }());
      }
      else if (s && a) {
        console.log("reverseLeft()");
        (async function() { setCommand(await reverseLeft()); }());
      }
      else if (s && d) {
        console.log("reverseRight()");
        (async function() { setCommand(await reverseRight()); }());
      }
      else {
        console.log("Invalid Key Combination: " + keyPressedString(w, a, s, d));
      }
    }
    else if (num === 1) {
      if (w) {
        console.log("forward()");
        (async function() { setCommand(await forward()); }());
      }
      else if (a) {
        console.log("rotateLeft()");
        (async function() { setCommand(await rotateLeft()); }());
      }
      else if (s) {
        console.log("reverse()");
        (async function() { setCommand(await reverse()); }());
      }
      else if (d) {
        console.log("rotateRight()");
        (async function() { setCommand(await rotateRight()); }());
      }
    }
    else if (num === 0) {
      console.log("end()");
      (async function() { setCommand(await end()); }());
    }
    else {
      console.log("Invalid Key Combination: " + keyPressedString(w, a, s, d));
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [w, a, s, d]);
  // sensor hook
  useEffect(() => {
    if (j) {
      if (intervalId) {
        stopSensing();
        console.log("stopSensing()");
      }
      else {
        startSensing();
        console.log("startSensing()");
      }
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [j])

  // components
  return (
    <>
    <RockModal show={data["rock"]} text={`${data.rock}`} />
    <Container>
      <DisplayContainer>
        <Left>
          <MissionClockDisplay start={start}/>
          <SensorModule>
            <SensorDisplayWrapper><SensorDisplay name="ACOUSTIC SIG" value={data.acoustic} unit="DB" max={1} measure={true}/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="RADIO SIG" value={data.radio} unit="HZ" max={1} measure={true}/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="INFRARED SIG" value={data.infrared} unit="HZ" max={1} measure={true}/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="MAGNETIC FLD" value={data.magnetic} unit="G" max={1} measure={true}/></SensorDisplayWrapper>
            <Label>ENVIRONMENT</Label>
          </SensorModule>
          <ConnectionDisplay connected={connection} device="EEEROVER" address="192.168.0.17" method="HTTP" time={stable}/>
        </Left>
        <Right>
          <ClockDisplay />
          <RoverModule>
            <SensorDisplayWrapper><SensorDisplay name="OUTPUT VOL" value="10.09" max={12} unit="V" measure={true}/></SensorDisplayWrapper>
            {/* <SensorDisplayWrapper><SensorDisplay name="BATTERY" value="12.34" unit="%"/></SensorDisplayWrapper> */}
            <SensorDisplayWrapper><SensorDisplay name="DELAY" value={command.duration} unit="MS" max={20} measure={true}/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="MODE" value={command.mode} unit={command.abbrev}/></SensorDisplayWrapper>
            <Label>ROVER STATUS</Label>
          </RoverModule>
        </Right>
      </DisplayContainer>
      <CommandContainer>
        <CommandKeyDisplay letter="W" command="FORWARD"/>
        <CommandKeyDisplay letter="A" command="LEFT TURN"  />
        <CommandKeyDisplay letter="D" command="RIGHT TURN"  />
        <CommandKeyDisplay letter="S" command="REVERSE"  />
        <CommandKeyDisplay letter="J" command="STOP/START SENSORS"  />
      </CommandContainer>
    </Container>
    </>
  );
};