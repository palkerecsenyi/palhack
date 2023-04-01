import { useEffect, useState } from "react"

export const useAuth = () => {
    const [authState, setAuthState] = useState<string | undefined>(
        localStorage.getItem("token") ?? undefined
    )

    useEffect(() => {
        if (authState) {
            localStorage.setItem("token", authState)
        } else {
            localStorage.removeItem("token")
        }
    }, [authState])

    return [authState, setAuthState] as const
}
