import Container from "./elements/Container";
import React from "react";
import Carbonabar from "./elements/Navbar"
import CartTotal from "./components/CartTotal"
import LoginPage from "./components/LoginPage"

export default function App() {
    const loggedIn = false
    return <Container>
        <Carbonabar />
        {loggedIn ? <>
            <CartTotal />
        </> : <>
            <LoginPage />
        </>}
    </Container>
}
