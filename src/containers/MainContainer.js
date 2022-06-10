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

import { drive, reverse, left, right, end, sensors } from "../apis/HttpComms.api";

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
        if (!connection) {
          // set connection state
          setConnection(true);
          // set start time
          let systemStart = new Date((new Date()).getTime() - parsed.time);
          setStart(systemStart);
        }

        setData(parsed);
      }
      catch (e) {
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
  // command hook
  useEffect(() => {
    if ((w + a + s + d) > 1) {
      console.log("nothing");
    }
    else if (w) {
      drive();
      console.log("drive()");
    }
    else if (a) {
      left();
      console.log("left()");
    }
    else if (s) {
      reverse();
      console.log("reverse()");
    }
    else if (d) {
      right();
      console.log("right()");
    }
    else {
      end();
      console.log("end()");
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
          <ConnectionDisplay connected={connection} device="EEEROVER" address="192.168.0.17" method="HTTP" time={start}/>
        </Left>
        <Right>
          <ClockDisplay />
          <RoverModule>
            <SensorDisplayWrapper><SensorDisplay name="OUTPUT VOL" value="10.09" max={12} unit="V" measure={true}/></SensorDisplayWrapper>
            {/* <SensorDisplayWrapper><SensorDisplay name="BATTERY" value="12.34" unit="%"/></SensorDisplayWrapper> */}
            <SensorDisplayWrapper><SensorDisplay name="MODE" value={data.mode} unit={(data.mode ? data.mode[0] : "N")}/></SensorDisplayWrapper>
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