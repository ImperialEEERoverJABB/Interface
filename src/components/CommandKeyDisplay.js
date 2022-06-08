import styled from 'styled-components';

import { useKeyPress } from '../utils/KeyPress.util';

const DisplayWrapper = styled.div`
  height: 40px;

  display: flex;
  flex-direction: row;
`;

const LeftWrapper = styled.div`
`;

const ClearKeyBox = styled.div`
  width: 40px;
  height: 40px;

  box-sizing: border-box;
  border: solid 2px white;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ClearKey = styled.span`
  color: white;
  font-size: 1.25em;
`;

const PressedKeyBox = styled.div`
  width: 40px;
  height: 40px;

  box-sizing: border-box;
  border: solid 2px white;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  box-sizing: border-box;
  background-color: white;
  mix-blend-mode: screen;
`;

const PressedKey = styled.span`
  color: black;
  font-size: 1.25em;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Command = styled.span`
  margin: 0;
  margin-left: 8px;
  color: white;
  font-size: 1.25em;
`;


export const CommandKeyDisplay = ({ 
  letter,
  command
}) => {
  var pressed = useKeyPress(letter.toLowerCase());
  return (
    <DisplayWrapper>
      <LeftWrapper>
        {pressed ?
          <PressedKeyBox><PressedKey>{letter}</PressedKey></PressedKeyBox> :
          <ClearKeyBox><ClearKey>{letter}</ClearKey></ClearKeyBox>
        }
      </LeftWrapper>
      <RightWrapper><Command>{command}</Command></RightWrapper>
    </DisplayWrapper>
  );
};