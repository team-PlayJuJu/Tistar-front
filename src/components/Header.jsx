import styled from "styled-components";
import Logo from "./icons/Logo";
import Profile from "./icons/Profile";
import Send from "./icons/Send";
import Sun from "./icons/Sun-Image";

const Flex = styled.span`
    display: flex;
`

const Header = () => {
    return (
            <header>
                <Flex className="logo">
                    <Logo />
                    <p className="title">TISTAR</p>
                </Flex>
                <Flex>
                    <div className="send"><Send /></div>
                    <Profile />
                    <Sun />
                </Flex>
            </header>
    )
}

export default Header;