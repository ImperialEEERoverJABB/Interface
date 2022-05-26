import { useState, useEffect } from 'react';
import styled from 'styled-components';

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

// External Sol
// https://usehooks.com/useKeyPress/
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

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