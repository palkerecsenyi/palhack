import React from "react"
import { useLeaderboard } from "../data/leaderboard"

export default function Leaderboard() {
    const leaderboard = useLeaderboard()
    return <div>
        {leaderboard.map(entry => <div key={entry.username}>
            
        </div>)}
    </div>
}
