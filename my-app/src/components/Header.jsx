import Logo from "./icons/Logo";
import Send from "./icons/Send";


const Header = () => {
    return (
        <>
            <span className="logo">
                <Logo />
                <p className="title">TISTAR</p>
                <Send />
                <p className="send">전송하기</p>
            </span>
        </>
    )
}

export default Header