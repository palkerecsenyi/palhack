import { useEffect, useState } from "react"
import { serverAddress } from "./vars"

export interface LeaderboardEntry {
    total: number
    username: string
}

export const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${serverAddress}/api/v1/getLeaderboard`
            )
            const data = await response.json() as LeaderboardEntry[]
            setLeaderboard(data)
        })()
    }, [])

    return leaderboard
}
