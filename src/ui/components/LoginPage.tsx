import React, { FormEvent, useCallback, useState } from "react"
import styles from "../styles/inputs.module.scss"

async function login(username: string, password: string) {
    //const URL = require('url').Url;
    const base = "http://localhost:30000/api/v1/verifyLogin";
    const url = new URL(base);
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);
    const response = await fetch(url);
    if (response.ok) {
        if (await response.text() == "sad"){
            //login is invalid
            return false;
        }else{
            //login is valid
            return true;
        }
    } else {
        console.error(response)
        return null;
    }
}

interface props {
    onChange(loggedIn: boolean): void
}

export default function LoginPage(
    {
        onChange
    }: props
) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e: FormEvent) => {
        login(username, password).then(loginSuccessful => {
            if (loginSuccessful) {
                onChange(true)
            }
        })
        e.preventDefault()
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
