import { useEffect } from 'react';
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

const nextConnectingState = (last) => {
  let now = new Date();
  if ((now - last) < 1000) {
    return last;
  }
  else {
    let display = document.getElementById('connection');
    if (display.innerText !== 'ESTABLISHING CONNECTION...') {
      display.innerText += '.';
    }
    else {
      display.innerText = 'ESTABLISHING CONNECTION';
    }
    return new Date(); 
  }
}


export const ConnectionDisplay = ({
  device,
  camera,
  connected,
  method,
  time,
  address
}) => {
  useEffect(() => {
    var last = new Date();
    setInterval(() => {
      last = nextConnectingState(last);
    }, 1000);
  }, [connected])

  return (
    <DisplayWrapper>
      <CameraDisplay>
        <DeviceSpan>{device + " > "}</DeviceSpan>
        <CameraSpan>{(camera ? camera : "NO FEED")}</CameraSpan>
      </CameraDisplay>
      { connected ?
        <StatusDisplay>CONNECTED-{address}-{method}-{(time.toTimeString()).toUpperCase()} </StatusDisplay> :
        <StatusDisplay id="connection">ESTABLISHING CONNECTION</StatusDisplay>
      }
    </DisplayWrapper>
  );
};


