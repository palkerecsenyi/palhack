import Container from "./elements/Container";
import React from "react";
import Carbonabar from "./elements/Navbar"
import CartTotal from "./components/CartTotal"
import LoginPage from "./components/LoginPage"
import { useAuth } from "./data/auth"
import Leaderboard from "./components/Leaderboard"

export default function App() {
    const [auth, setAuth] = useAuth()
    return <Container>
        <Carbonabar />
        {auth ? <>
            <CartTotal />
            <Leaderboard />
        </> : <>
            <LoginPage
                onChange={setAuth}
            />
        </>}
    </Container>
}
