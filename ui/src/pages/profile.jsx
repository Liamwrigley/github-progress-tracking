import React, { useEffect, useState } from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { Loading } from '../components/loading';
import { AuthTicket } from '../components/authTicket';
import { useParams, useNavigate } from 'react-router-dom';
import { Countdown } from '../components/countdown';
import { Ticket } from '../components/ticket';
import { UserTicket } from '../components/userTicket';

const fetchUser = (id) => Get(`/user/${id}`)

export const Profile = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const { data: user, isFetching, isError, error } = useQuery(
        `user-${id}`,
        () => fetchUser(id)
    );

    if (!id) {
        navigate("/");
        return null; // Ensure no further rendering if ID is not present
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <Loading isFetching={isFetching && !user} >
            {user && <div className='flex flex-col gap-4'>
                <div className="flex flex-row gap-4 justify-center">
                    <UserTicket
                        avatar={user.discordAvatar}
                        username={user.discordUsername}
                        title={"discord"}
                        bsIcon={"bi bi-discord"}
                    />
                    <UserTicket
                        avatar={user.githubAvatar}
                        username={user.githubUsername}
                        title={"github"}
                        bsIcon={"bi bi-github"}
                    />
                </div>
                <div className="divider">Streak Information</div>
                <div className="flex flex-row gap-4 justify-evenly ">
                    <Ticket title={"Current Streak"}>
                        <StatDisplay icon={"🔥"} data={user.currentStreak} textLarge />
                    </Ticket>
                    <Ticket title={"Best Streak"}>
                        <StatDisplay icon={"🏆"} data={user.bestStreak} textLarge />
                    </Ticket>
                    <Ticket title={"Total Pushes"}>
                        <StatDisplay bsIcon={"bi bi-cloud-upload"} data={user.totalPushes} textLarge />
                    </Ticket>
                </div>
                <div className="flex flex-row gap-4 justify-center">
                    <Ticket title={"Next Streak At"} icon={"🚀"}>
                        <Countdown target={user.nextStreakAt_UTC} countToStreakEnd={false} />
                    </Ticket>
                    <Ticket title={"Streak Ends In"} icon={"⚠️"}>
                        <Countdown target={user.endStreakAt_UTC} countToStreakEnd={true} />
                    </Ticket>
                </div>
                <div className="divider">Tracked Repositories: {user.repositories.length}</div>
                {user.repositories.map((repo, i) => {
                    return (
                        <Ticket title={repo.name} bsIcon={"bi bi-github"}>
                            <div className='flex flex-row gap-4 mt-3 '>
                                <p className='truncate text-left'>{repo.description}</p>
                                <div className="divider divider-horizontal"></div>
                                <div className="flex flex-col gap-4 justify-start text-xs">
                                    <StatDisplay title={"Pushes"} bsIcon={"bi bi-cloud-upload"} data={repo.totalPushes} />
                                    <StatDisplay title={"Commits"} bsIcon={"bi bi-github"} data={repo.totalCommits} />
                                </div>
                            </div>
                        </Ticket>
                    )
                })}
            </div>}
        </Loading>
    )
}

const StatDisplay = ({ title, bsIcon, icon, data, textLarge = false }) => (
    <div className={`flex items-center space-x-3 ${textLarge ? "text-2xl" : ""}`}>
        <div>{title && <strong>{title}: </strong>}{bsIcon ? <i className={bsIcon}></i> : <span>{icon}</span>} {data}</div>
    </div>
)