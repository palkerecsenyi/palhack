import React from "react"
import { useLeaderboard } from "../data/leaderboard"
import styles from "../styles/leaderboard.module.scss"

export default function Leaderboard() {
    const leaderboard = useLeaderboard()
    return <div className={styles.leaderboardContainer}>
        <h1 className={styles.leaderboardHeader}>
            Leaderboard
        </h1>
        {leaderboard.map(entry => <div key={entry.username} className={styles.flexContainer}>
            <div className={styles.title}>
                <img src={entry.url} alt="nothing lol"/>
                <p>
                    {entry.username}
                </p>
            </div>
            <p className={styles.totalNumber}>
                {entry.total}kg
            </p>
        </div>)}
    </div>
}
