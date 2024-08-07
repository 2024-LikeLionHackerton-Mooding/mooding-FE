import styled from 'styled-components';

const StyledPhoneFrame = styled.div`
    width: 430px;
    height: 99.75dvh;
    display: flex;
    justify-content: center;
    border: solid 0.5px #dfdfe0;
    overflow-y: hidden;
    overflow-x: hidden;

    /* 미디어 쿼리 - 휴대폰) */
    @media (max-width: 430px) {
        width: 100dvw;
        height:100dvh;
        border: none;
    }
`;

const PhoneFrame = ({ children }) => {
    return (
        <StyledPhoneFrame>
            {children}
        </StyledPhoneFrame>
    );
}

export default PhoneFrame;
