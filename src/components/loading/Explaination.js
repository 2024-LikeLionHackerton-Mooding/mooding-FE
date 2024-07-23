import styled from "styled-components";
import { GlobalFontDalmoori } from "../../lib/fontSetting";
import DancingMooding from "../../lib/images/DancingMooding.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledExplaination = styled.div`
  position: absolute;
  font-size: 20px;
  font-family: "dalmoori", sans-serif;
  font-weight: bold;
`;

const MoodingImg = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  transform: translate(80px, -220px);
`;

const Explaination = ({ animeDone }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Todo : 추가 로직 구현 -> 로직이 바뀔 수도 있다.
    // 1. localStorage에서 UUID 불러옴
    // 2. 서버로부터 UUID get
    // 3. 비교를 통해 유효성 검사
    if (animeDone) {
      const timer = setTimeout(() => {
        navigate("/result/1");  //1 -> UUID 값으로 바뀔것
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [animeDone, navigate]);
  return (
    <>
      <GlobalFontDalmoori />
      {animeDone && (
        <StyledExplaination>
          <MoodingImg src={DancingMooding} alt="DancingMooding" />
          무딩이가 감정일기를 소화중이에요...
        </StyledExplaination>
      )}
    </>
  );
};

export default Explaination;