import { useState } from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  margin: 0;
  color: white;
`;

const TimeDisplay = styled.p`
  margin: 0;
  margin-bottom: 8px;
  text-align: right;
`;

const DateDisplay = styled.p`
  margin: 0;
  text-align: right;
`;


const toTwoDigits = (num) => {
  let str = num.toString();
  if (str.length === 1) return "0" + str;
  else return str;
};

const getNewClockState = () => {
  let date = new Date();
  let dateState = toTwoDigits(date.getDate()) + "-" + toTwoDigits(date.getMonth()+1) + "-" + toTwoDigits(date.getFullYear());
  let timeState = toTwoDigits(date.getHours()) + ":" + toTwoDigits(date.getMinutes());
  return { date: dateState, time: timeState};
};

export const ClockDisplay = () => {
  const [clock, setClock] = useState(getNewClockState);
  
  setInterval(() => { setClock(getNewClockState())}, 10000);

  return (
    <DisplayWrapper>
      <TimeDisplay>TIME {clock.time}</TimeDisplay>
      <DateDisplay>DATE {clock.date}</DateDisplay>
    </DisplayWrapper>
  );
};