import styled from "styled-components";
import Logo from "./icons/Logo";
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    background-color: #f2f2f2;
`

const Input = styled.input`
  width: 300px;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: flex;
  width: 300px;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  background-color: #6200ee;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`;

const SignUpLink = styled.a`
  margin-top: 20px;
  font-size: 14px;
  color: #6200ee;
  text-decoration: none;
  background-image: url({});
`;

const Login = () => {
    return (
        <Container>
            <Logo />
            <Link to="/Home"></Link>
            <Input />
            <Button />
            <SignUpLink />
        </Container>
    )
}


export default Login;