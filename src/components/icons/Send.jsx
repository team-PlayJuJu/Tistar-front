import styled from "styled-components";
import SendImage from "./Send-Image";

const SendButton = styled.div`
    display: flex;
    border-radius: 4.16669rem;
    background: #3B3B3B;
    color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    flex-wrap: wrap;
    align-items: center;
`

export default function Send() {
    return(
        <SendButton>
            <SendImage />
            <p>전송하기</p>
        </SendButton>
    )
}