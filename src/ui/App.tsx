import Container from "./elements/Container";
import React from "react";
import Carbonabar from "./elements/Navbar"
import CartTotal from "./components/CartTotal"
import LoginPage from "./components/LoginPage"
import { useAuth } from "./data/auth"
import Leaderboard from "./components/Leaderboard"
import Duck, { DuckLevel } from "./components/Duck"
import { useDuckHappiness } from "./data/cart"

export default function App() {
    const [auth, setAuth] = useAuth()
    const duckLevel = useDuckHappiness()
    return <Container>
        <Carbonabar />
        {auth ? <>
            <Duck
                level={duckLevel}
            />
            <CartTotal />
            <Leaderboard />
        </> : <>
            <LoginPage
                onChange={setAuth}
            />
        </>}
    </Container>
}
