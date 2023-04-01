import React, { FormEvent, useCallback, useState } from "react"

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
    }, [username, password])

    return <div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <p>{ username }</p>
            <p>{ password }</p>
        </form>
    </div>
}
