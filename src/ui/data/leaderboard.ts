import { useEffect, useState } from "react"
import { serverAddress } from "./vars"

export const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${serverAddress}/api/v1/getLeaderboard`
            )
            console.log(await response.json())
        })()
    }, [])

    return leaderboard
}
