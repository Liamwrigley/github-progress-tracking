import React, { useEffect, useState } from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { Loading } from '../components/loading';
import { ProfileTicket } from '../components/profileTicket';
import { useParams, useNavigate } from 'react-router-dom';
import { Countdown } from '../components/countdown';
import { Ticket } from '../components/ticket';

const fetchUser = (id) => Get(`/user/${id}`)

export const Profile = () => {
    const [_timer, setTimer] = useState(44)
    const navigate = useNavigate()
    const { id } = useParams();

    const { data: user, isFetching, isError, error } = useQuery(
        `user-${id}`,
        () => fetchUser(id)
    );

    useEffect(() => {
        // Set up the interval to decrement the number every second
        let interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

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
                    <ProfileTicket
                        avatar={user.discordAvatar}
                        username={user.discordUsername}
                        dynamic={false}
                        title={"discord"}
                        type={"discord"}
                    />
                    <ProfileTicket
                        avatar={user.githubAvatar}
                        username={user.githubUsername}
                        dynamic={false}
                        title={"github"}
                        type={"github"}
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
                    <Countdown title={"Next Streak At"} target={user.nextStreakAt_UTC} />
                    <Countdown title={"Streak Ends In"} target={user.endStreakAt_UTC} />
                </div>
                <div className="divider">Tracked Repositories: {user.repositories.length}</div>
                {user.repositories.map((repo, i) => {
                    return (
                        <Ticket title={repo.name} bsIcon={"bi bi-github"}>
                            <div className='flex flex-col gap-4 mt-3 '>
                                <p className='truncate text-left'>{repo.description}</p>
                                <div className="flex flex-row gap-4 justify-evenly">
                                    <StatDisplay title={"Total Pushes"} bsIcon={"bi bi-cloud-upload"} data={repo.totalPushes} />
                                    <StatDisplay title={"Total Commits"} bsIcon={"bi bi-github"} data={repo.totalCommits} />
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