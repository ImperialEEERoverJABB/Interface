import styled from 'styled-components';


const DisplayWrapper = styled.div`
  margin: 0;
  width: 600px;
  color: white;
`;

const CameraDisplay = styled.p`
  margin:0;
  margin-bottom: 8px;
  font-size: 2.75em;
`;

const DeviceSpan = styled.span`
  font-weight: bold;
`;

const CameraSpan = styled.span`
`;

const StatusDisplay = styled.p`
  margin: 0;
  font-size: 0.75em;
  font-weight: bold;
`;


export const ConnectionDisplay = ({
  device,
  camera,
  connected,
  method,
  time,
  address
}) => {
  

  return (
    <DisplayWrapper>
      <CameraDisplay>
        <DeviceSpan>{device + " > "}</DeviceSpan>
        <CameraSpan>{(camera ? camera : "NO FEED")}</CameraSpan>
      </CameraDisplay>
      { connected ?
        <StatusDisplay>CONNECTED-{address}-{method}-{(time.toTimeString()).toUpperCase()} </StatusDisplay> :
        <StatusDisplay>ESTABLISHING CONNECTION...</StatusDisplay>
      }
    </DisplayWrapper>
  );
};


