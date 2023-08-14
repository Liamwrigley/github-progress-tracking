import React, { useEffect, useState } from "react"
import { Get } from '../utility/ApiRequest'
import { DiscordProfile } from "../components/discordProfile"
import { TimeSince } from "../utility/timeHelpers"


export const Leaderboard = () => {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialData = await Get("/leaderboard")
                setUserData(initialData)
                setLoading(false)

            } catch (err) {
                setLoading(false)

            }
        }

        fetchData();
    }, [])


    return (
        <>
            <div className="flex pb-4 group flex-row justify-start  items-center">
                <div className="w-32" ><strong>#</strong></div>
                <div className="basis-1/5" ><strong>User</strong></div>
                <div className="basis-1/5" ><strong>Total Pushes</strong></div>
                <div className="basis-1/5" ><strong>Current Streak</strong></div>
                <div className="basis-1/5" ><strong>Best Streak</strong></div>
            </div>
            {userData.map((data, i) => {
                const time = TimeSince(data.ts)
                return (
                    <div className="flex pb-4 group flex-row justify-start  items-center">
                        <div className="w-32" >{i + 1}</div>
                        <DiscordProfile name={data.discordUsername} avatar={data.discordAvatar} basis={5} />
                        <div className="basis-1/5" ><i class="bi bi-github"></i> {data.totalPushes}</div>
                        <div className="basis-1/5" ><span>&#128293;</span> {data.currentStreak}</div>
                        <div className="basis-1/5" ><span>&#127942;</span> {data.bestStreak}</div>
                    </div>
                )
            })}
        </>
    )
}