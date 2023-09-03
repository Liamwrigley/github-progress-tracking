import React from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { Loading } from '../components/loading';
import { ProfileTicket } from '../components/profileTicket';
import { useParams, useNavigate } from 'react-router-dom';

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
                <div className="flex flex-row gap-4 justify-evenly">
                    <div><strong>Current Streak</strong> {user.currentStreak}</div>
                    <div><strong>Best Streak</strong> {user.bestStreak}</div>
                    <div><strong>Total Pushes</strong> {user.totalPushes}</div>
                </div>
                <div className="divider">Tracked Repositories</div>
                {user.repositories.map((repo, i) => {
                    return (
                        <ProfileTicket
                            avatar={null}
                            username={repo.description}
                            dynamic={false}
                            title={repo.name}
                            type={repo.name}
                        />
                    )
                })}

                {JSON.stringify(user)}
            </div>}
        </Loading>
    )
}