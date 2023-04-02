import React, { FormEvent, useCallback, useState } from "react"
import styles from "../styles/inputs.module.scss"
import { serverAddress } from "../data/vars"

async function login(username: string, password: string) {
    //const URL = require('url').Url;
    const base = `${serverAddress}/api/v1/verifyLogin`;
    const url = new URL(base);
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);
    const response = await fetch(url);
    if (response.ok) {
        const responseText = await response.text()
        if (responseText == "sad"){
            //login is invalid
            return undefined;
        }else{
            //login is valid
            return responseText;
        }
    } else {
        console.error(response)
        return null;
    }
}

interface props {
    onChange(token: string | undefined): void
}

export default function LoginPage(
    {
        onChange
    }: props
) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault()
        const token = await login(username, password)
        onChange(token)
    }, [username, password])

    return <div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.credentials}>
                Username:
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
            </label>
            <label className={styles.credentials}>
                Password:
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
            </label>
            <button type="submit" className={styles.button}>Log in</button>
        </form>
    </div>
}
