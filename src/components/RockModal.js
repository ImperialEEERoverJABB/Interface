import styled from 'styled-components';

const RockModalDisplay = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  z-index: 10;
  position: absolute;
`;

const RockModalDisplayNoShow = styled.div`
  display: none;
`;

const RockModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 24px;
  border-radius: 16px;
`;

const ModalText = styled.span`
  color: white;
  font-size: 2em;
`;

const FlashModalText = styled.span`
  color: white;
  font-size: 2em;
  @keyframes flashtext {
    from { opacity: 100%; }
    50% { opacity: 0% }
    to { opacity: 100%; }
  }
  animation-name: flashtext;
  animation-duration: 1s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition: all 0.5s ease-in-out; 
`;

export const RockModal = ({
  show,
  flash=false,
  text
}) => {
  return (
    (show ? 
      <RockModalDisplay>
        <RockModalWrapper>
          {(flash ? 
            <FlashModalText>{text}</FlashModalText> :
            <ModalText>{text}</ModalText>)}
        </RockModalWrapper>
      </RockModalDisplay> :
      <RockModalDisplayNoShow />)
  );
};