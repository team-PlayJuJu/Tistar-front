import Logo from "./icons/Logo";
import Profile from "./icons/Profile";
import Sun from "./icons/Sun";

const Header = () => {
    return (
        <>
            <span className="logo">
                <Logo />
                <p className="title">TISTAR</p>
                <p className="send">전송하기</p>
                <Profile />
                <Sun />
            </span>
        </>
    )
}

export default Header;