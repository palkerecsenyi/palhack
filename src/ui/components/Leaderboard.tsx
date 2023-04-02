import React from "react"
import { useLeaderboard } from "../data/leaderboard"
import styles from "../styles/leaderboard.module.scss"

export default function Leaderboard() {
    const leaderboard = useLeaderboard()
    return <div >
        {leaderboard.map(entry => <div key={entry.username} className={styles.flexContainer}>
            <div className={styles.title}>
                <img src=""  alt="nothing lol"/>
                <p>
                    {entry.username}
                </p>
            </div>
            <p>
                {entry.total}
            </p>
        </div>)}
    </div>
}
