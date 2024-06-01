import Logo from "./icons/Logo";
import Profile from "./icons/Profile";
import Send from "./icons/Send";
import Send2 from "./icons/Send2";
import Sun from "./icons/Sun";

const Header = () => {
    return (
        <>
            <span className="logo">
                <Logo />
                <p className="title">TISTAR</p>
                <Send2 />
                <Send />
                <Profile />
                <Sun />
            </span>
        </>
    )
}

export default Header;