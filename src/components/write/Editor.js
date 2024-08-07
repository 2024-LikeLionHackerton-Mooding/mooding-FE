import styled, { keyframes } from "styled-components";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/FontAwesome";
import { useEffect, useRef } from "react";
import { GlobalFontDNF, GlobalFontDalmoori } from "../../lib/fontSetting";
import Mooding_trashcan from "../../lib/images/Mooding_trashcan.png";
import smalltree1 from "../../lib/images/smalltree.png";
import smalltree2 from "../../lib/images/smalltree2.png";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height:100%;
`;

const crumpleAndExpand = keyframes`
  0% {
    transform: scale(0.5) translateZ(-200px);
    opacity: 0;
    filter: blur(10px);
  }
  10% {
    transform: scale(0.55) translateZ(-175px);
    opacity: 0.1;
    filter: blur(9px);
  }
  20% {
    transform: scale(0.6) translateZ(-150px);
    opacity: 0.2;
    filter: blur(8px);
  }
  30% {
    transform: scale(0.65) translateZ(-125px);
    opacity: 0.3;
    filter: blur(7px);
  }
  40% {
    transform: scale(0.7) translateZ(-100px);
    opacity: 0.4;
    filter: blur(6px);
  }
  50% {
    transform: scale(0.75) translateZ(-75px);
    opacity: 0.5;
    filter: blur(5px);
  }
  60% {
    transform: scale(0.8) translateZ(-50px);
    opacity: 0.6;
    filter: blur(4px);
  }
  70% {
    transform: scale(0.85) translateZ(-25px);
    opacity: 0.7;
    filter: blur(3px);
  }
  80% {
    transform: scale(0.9) translateZ(0px);
    opacity: 0.8;
    filter: blur(2px);
  }
  90% {
    transform: scale(0.95) translateZ(0px);
    opacity: 0.9;
    filter: blur(1px);
  }
  100% {
    transform: scale(1) translateZ(0);
    opacity: 1;
    filter: blur(0);
  }
`;

const StyledEditor = styled.div`
  width: 100%;
  height: 70dvh;
  background-color: #fafbed;
  border-radius: 20px;
  margin-top: 10px;
  background-size: cover;
  animation: ${crumpleAndExpand} 0.5s ease-out forwards;
  transform-style: preserve-3d;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display:flex;
  flex-direction: column;
  justify-content:space-between;
`;

const Title = styled.p`
  font-size: 19px;
  font-weight: bold;
  font-family: "DNFBitBitv2", sans-serif;
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const TrashCanImage = styled.img`
  width: 31px;
  height: 53.14px;
  margin-left: 3px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuillField = styled.div`
  font-size: 15px;
  font-weight: bold;
  overflow-y: hidden;
  height: 50dvh;
`;

const SaveContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:center;
  align-items: flex-end;
`;

const SmallTree = styled.img`
  width : 25%;
  height: 9dvh;
`;

const SaveButton = styled.button`
  width:30%;
  height:8dvh;
  border: 2px solid black;
  border-radius: 20px;
  font-family: "DNFBitBitv2",sans-serif;
  background-color: white;
  font-size: 1.5rem;
  margin-bottom: 1dvh;
  box-shadow: 4px 2px 4px #000000;
  margin-left: 2rem;
  margin-right: 2rem; 
  cursor: pointer;
  &:active{
    background-color: #fafaa0;
    opacity: 75%;
    transform: scale(0.95);
    border: 4px solid black;
  }
`;

const Editor = ({ setButtonClicked, setBody, setFeedMeImg,setNoteButtonClick,initialBody }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  useEffect(() => {
    const Font = Quill.import("formats/font");
    Font.whitelist = ["dalmoori"];
    Quill.register(Font, true);

    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "당신의 기분을 무딩이에게 먹여주세요!",
      modules: {},
    });

    const quill = quillInstance.current;
    quill.root.style.fontFamily = "dalmoori, sans-serif";

    if(initialBody){
      quill.root.innerHTML = initialBody;
    }

    quill.on("text-change", () => {
      setBody(quill.root.innerHTML);
    });

    return () => {
      quill.off("text-change");
    };
  }, [setBody]);

  return (
    <EditorContainer>
      <GlobalFontDNF />
      <GlobalFontDalmoori />
      <StyledEditor>
        <TitleContainer>
          <FontAwesomeIcon
            icon="fa-solid fa-chevron-left"
            style={{ marginLeft: "10px"}}
            onClick={() => {
              setButtonClicked(false);
              setNoteButtonClick(false);
              setFeedMeImg(false);
            }}
          />
          <TitleBar>
            <Title>감정 털어놓기</Title>
            <TrashCanImage src={Mooding_trashcan} alt="mooding_trashcan" />
          </TitleBar>
          <div></div> {/*공간채우기용*/}
        </TitleContainer>
        <QuillField ref={quillElement} />
        <SaveContainer>
            <SmallTree src={smalltree1} alt="small_tree1"/>
            <SaveButton onClick={()=>{
              setButtonClicked(false);
              setFeedMeImg(true);
              alert(`노트에 감정이 쓰여졌어요!\n무딩이의 입에 노트를 드래그해주세요!`);
            }}>저장</SaveButton>
            <SmallTree src={smalltree2} alt="small_tree2"/>
        </SaveContainer>
      </StyledEditor>
    </EditorContainer>
  );
};

export default Editor;
