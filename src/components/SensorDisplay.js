import styled from 'styled-components';

// TODO: Add modifiable weight & heigh 
const DisplayWrapper = styled.div`
  width: 260px;
  height: 80px;
  display: flex;
`;

const LeftWrapper = styled.div`
  flex: 2.25;
`;

const NameWrapper = styled.div`
  height: 40%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.5px;
`;

const Name = styled.span`
  color: white;
  // font-weight: bold;
  opacity: 80%;
`;

const ValueWrapper = styled.div`
  height: 60%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Value = styled.span`
  color: white;
  font-size: 3.5em;
  margin-bottom: -10px;
`;

const RightWrapper = styled.div`
  flex: 1;
`;

const StatusWrapper = styled.div`
  margin: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  box-sizing: border-box;
  border: solid 8px white;
  border-right-color: rgba(255, 255, 255, 0.6);
	/* border-bottom-color: rgba(255, 255, 255, 0.6); */
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  transition: all 0.5s ease-in;
  animation-name: rotate;
  animation-duration: 1.5s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
`;

const BrokenStatusWrapper = styled.div`
  margin: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @keyframes flash {
    from { border: solid 8px rgba(255, 0, 0, 0);  }
    50% { border: solid 8px rgba(255, 0, 0, 0.6); }
    to { border: solid 8px rgba(255, 0, 0, 0);  }
  }

  transition: all 0.5s ease-in-out;
  animation-name: flash;
  animation-duration: 1.5s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear; 

  box-sizing: border-box;
  border: solid 8px rgba(255, 0, 0, 0.6);
`;

const UnitWrapper = styled.div`
  margin: 0;
  width: 90%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.6);

  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @keyframes antirotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  transition: all 0.5s ease-in;
  animation-name: antirotate;
  animation-duration: 1.5s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const BrokenUnitWrapper = styled.div`
  margin: 0;
  width: 90%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Unit = styled.span`
  color: rgba(255, 255, 255, 1);
  font-size: 1.25em;
  font-weight: bold;
`;


export const SensorDisplay = ({
  name,
  value,
  unit
}) => {
  return (
    <DisplayWrapper>
      <LeftWrapper>
        <NameWrapper><Name>{name}</Name></NameWrapper>
        <ValueWrapper><Value>{value ? value : "NULL"}</Value></ValueWrapper>
      </LeftWrapper>
      <RightWrapper>
        {value ? 
          <StatusWrapper><UnitWrapper><Unit>{unit}</Unit></UnitWrapper></StatusWrapper> : 
          <BrokenStatusWrapper><BrokenUnitWrapper><Unit>{unit}</Unit></BrokenUnitWrapper></BrokenStatusWrapper>
        }
      </RightWrapper>
    </DisplayWrapper>
  );
};