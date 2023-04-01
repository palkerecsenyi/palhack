import React, { FormEvent, useCallback, useState } from "react"
import styles from "../styles/inputs.module.scss"

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
    }, [username, password])

    return <div>
        <form onSubmit={handleSubmit}>
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
            <p>{ username }</p>
            <p>{ password }</p>
            <button type="submit">Log in</button>
        </form>
    </div>
}
