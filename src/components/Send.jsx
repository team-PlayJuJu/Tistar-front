import styled from "styled-components";
import SendImage from "./icons/Send-Image";



const SendButton = styled.button`
    display: flex;
    border-radius: 4.16669rem;
    background: #3B3B3B;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
    align-items: center;
    justify-content: center;
    width: 20.83331rem;
    height: 6.25rem;
    font-size: 16px;
    margin: 0rem 2rem;
    cursor: pointer; 
    border: none;
    &:hover {
    background-color: #F3F7EC;
    color: #3B3B3B;
    .SendImage {
        stroke: black;
    }
  }
`


export default function Send() {
    return (
        <SendButton>
            <SendImage />
            <p>전송하기</p>
        </SendButton>
    )
}
