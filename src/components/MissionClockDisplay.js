import { useState } from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  margin: 0;
`;

const Label = styled.p`
  width: 190px;
  margin: 0;
  margin-bottom: 8px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const MissionTimeWrapper = styled.div`
  width: 190px;
  background-color: white;
  mix-blend-mode: screen;
  text-align: left;
`;

const MissionTimeDisplay = styled.span`
  color: black;
  font-weight: bold;
  font-size: 2.5em;
  padding-left: 8px;
`;


const toTwoDigits = (num) => {
  let str = num.toString();
  if (str.length === 1) return "0" + str;
  else return str;
};

const getNewMissionTimeState = (start) => {
  let now = new Date();
  let diff = now - start;
  let hour = Math.floor(diff / (3600*1000));
  let min = (Math.floor(diff / (60*1000)));
  let sec = (Math.floor(diff / 1000)%60)
  let time = toTwoDigits(hour) + ":" + toTwoDigits(min) + ":" + toTwoDigits(sec);
  return time;
};

export const MissionClockDisplay = ({
  start
}) => {
  const [mission, setClock] = useState(getNewMissionTimeState(start));
  
  setInterval(() => { setClock(getNewMissionTimeState(start)) }, 1000);

  return (
    <DisplayWrapper>
      <Label><span>MISSION</span><span>ELAPSED</span><span>TIME</span></Label>
      <MissionTimeWrapper>
        <MissionTimeDisplay>{mission}</MissionTimeDisplay>
      </MissionTimeWrapper>
    </DisplayWrapper>
  );
};