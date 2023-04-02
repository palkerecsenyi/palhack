import { useEffect, useState } from "react"
import { useAuth } from "./auth"
import { serverAddress } from "./vars"

export const useCredits = () => {
    const [credits, setCredits] = useState<number>(0)
    const [authState] = useAuth()
    useEffect(() => {
        if (!authState) {
            setCredits(0)
            return
        }

        (async () => {
            const response = await fetch(`${serverAddress}/api/v1/getDuckCredits?token=${authState}`)
            const data = await response.json() as {
                userCredits: number
            }

            setCredits(data.userCredits)
        })()
    }, [authState])

    return credits
}
