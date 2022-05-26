import styled from 'styled-components';

import { MissionClockDisplay } from '../components/MissionClockDisplay';
import { SensorDisplay } from '../components/SensorDisplay';
import { ConnectionDisplay } from '../components/ConnectionDisplay';
import { ClockDisplay } from '../components/ClockDisplay';
import { CommandKeyDisplay } from '../components/CommandKeyDisplay';

import DummyImage from '../img/dummy-img-mars.png';

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

const start = new Date();

export const MainContainer = ({
  data
}) => {
  return (
    <Container>
      <DisplayContainer>
        <Left>
          <MissionClockDisplay start={start}/>
          <SensorModule>
            <SensorDisplayWrapper><SensorDisplay name="ACOUSTIC SIG" value="40.01" unit="KHZ"/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="RADIO SIG" value={undefined} unit="HZ"/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="INFRARED SIG" value="353.2" unit="HZ"/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="MAGNETIC FLD" value="01.00" unit="G"/></SensorDisplayWrapper>
            <Label>ENVIRONMENT</Label>
          </SensorModule>
          <ConnectionDisplay device="EEEROVER" camera="FRONT" connected address="192.168.0.17" method="HTTP" time={start}/>
        </Left>
        <Right>
          <ClockDisplay />
          <RoverModule>
            <SensorDisplayWrapper><SensorDisplay name="SPEED" value="10.23" unit="M/S"/></SensorDisplayWrapper>
            <SensorDisplayWrapper><SensorDisplay name="MODE" value="DRIVE" unit="D"/></SensorDisplayWrapper>
            <Label>ROVER STATUS</Label>
          </RoverModule>
        </Right>
      </DisplayContainer>
      <CommandContainer>
        <CommandKeyDisplay letter="W" command="FORWARD"/>
        <CommandKeyDisplay letter="A" command="LEFT TURN"  />
        <CommandKeyDisplay letter="D" command="RIGHT TURN"  />
        <CommandKeyDisplay letter="S" command="REVERSE"  />
        <CommandKeyDisplay letter="J" command="REFRESH SENSORS"  />
      </CommandContainer>
    </Container>
  );
};