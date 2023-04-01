import Container from "./elements/Container";
import React, {useState} from "react";
import Carbonabar from "./elements/Navbar"
import CartTotal from "./components/CartTotal"
import LoginPage from "./components/LoginPage"

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return <Container>
        <Carbonabar />
        {loggedIn ? <>
            <CartTotal />
        </> : <>
            <LoginPage
                onChange={l => setLoggedIn(l)}
            />
        </>}
    </Container>
}
