import React from "react"
import { Get } from '../utility/ApiRequest'
import { TimeSince, TimeUntil } from "../utility/timeHelpers"
import { useQuery } from 'react-query';

const fetchLeaderboardData = () => Get('/leaderboard');

export const Leaderboard = () => {
    const { data: userData, isLoading } = useQuery('leaderboardData', fetchLeaderboardData);

    if (isLoading) {
        return <></>;
    }


    return (
        <div className="overflow-x-auto">
            <table className="table table-md">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Pushes</th>
                        <th>Current Streak</th>
                        <th>Best Streak</th>
                        <th>Latest Push</th>
                        <th>Streak Ends</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((data, i) => {
                            const latestPush = TimeSince(data.lastPush_UTC)
                            console.log(data.endStreakAt_UTC)
                            const streakEnd = TimeUntil(data.endStreakAt_UTC)
                            return (
                                <tr key={`${i}${data.ts}`} className="group/list">
                                    {/* USER */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
                                                {/* <i className="bi bi-caret-right-fill"></i> */}
                                                <i className="bi bi-chevron-right"></i>
                                            </div>
                                            <div className="avatar group-hover/list:translate-x-2 duration-100">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={data.discordAvatar} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div className=" group-hover/list:translate-x-2 duration-100">
                                                <div className="font-bold"><i className="bi bi-discord"></i> {data.discordUsername}</div>
                                                <div className="text-sm opacity-50"><i className="bi bi-github"></i> {data.githubName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* TOTAL PUSHES */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <i className="bi bi-cloud-upload"></i> <span>{data.totalPushes}</span>
                                        </div>
                                    </td>
                                    {/* CURRENT STREAK */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <span>&#128293;</span> <span>{data.currentStreak}</span>
                                        </div>
                                    </td>
                                    {/* BEST STREAK */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <span>&#128293;</span> <span>{data.bestStreak}</span>
                                        </div>
                                    </td>
                                    {/* LATEST PUSH */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <span>{latestPush}</span>
                                        </div>
                                    </td>
                                    {/* STREAK TIMER */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <span>{streakEnd}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
    // return (
    //     <>
    //         <div className="flex pb-4 group flex-row justify-start  items-center">
    //             <div className="w-32" ><strong>#</strong></div>
    //             <div className="basis-1/5" ><strong>User</strong></div>
    //             <div className="basis-1/5" ><strong>Total Pushes</strong></div>
    //             <div className="basis-1/5" ><strong>Current Streak</strong></div>
    //             <div className="basis-1/5" ><strong>Best Streak</strong></div>
    //         </div>
    //         {userData.map((data, i) => {
    //             const time = TimeSince(data.ts)
    //             return (
    //                 <div className="flex pb-4 group flex-row justify-start  items-center">
    //                     <div className="w-32" >{i + 1}</div>
    //                     <DiscordProfile name={data.discordUsername} avatar={data.discordAvatar} basis={5} />
    //                     <div className="basis-1/5" ><i class="bi bi-github"></i> {data.totalPushes}</div>
    //                     <div className="basis-1/5" ><span>&#128293;</span> {data.currentStreak}</div>
    //                     <div className="basis-1/5" ><span>&#127942;</span> {data.bestStreak}</div>
    //                 </div>
    //             )
    //         })}
    //     </>
    // )
}