import React from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { SelectRepo } from '../components/selectRepo';


const fetchUser = () => Get('/auth/status')


export const Auth = () => {
    const { data: userData, isLoading, refetch } = useQuery('userData', fetchUser);
    const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID
    const DISCORD_REDIRECT = () => {
        var callbackUrl = `${process.env.REACT_APP_API_URL}/auth/discord-oauth-callback`
        return `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds&redirect_uri=${callbackUrl}&prompt=none`
    }

    const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT = () => `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo_hook%20repo%20user`


    // if (!isLoading) {
    //     if (!userData.authenticated) {
    //         window.location.href = DISCORD_REDIRECT()
    //     }
    //     // github not setup at all
    //     if (userData.authenticated && userData.user && Object.keys(userData.user.github).length === 0) {
    //         window.location.href = GITHUB_REDIRECT()
    //     }
    //     if (userData.authenticated && userData.user && !userData.user.github.repo && userData.needsGithubToken) {
    //         window.location.href = GITHUB_REDIRECT()
    //     }
    //     if (userData.authenticated && userData.user && !userData.user.github.repo) {
    //         return <SelectRepo user={userData.user} refetch={refetch} />
    //     }
    // }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <a href={DISCORD_REDIRECT()}>DISCORD TEST</a>
                {userData?.user && <>
                    <div className="flex items-center space-x-3">
                        <div className="group-hover/list:animate-blink opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
                            <i className="bi bi-chevron-right"></i>
                        </div>
                        <div className="avatar group-hover/list:translate-x-2 duration-100">
                            <div className="mask mask-circle w-12 h-12">
                                <img src={userData.user.discord.avatar} alt="Avatar" />
                            </div>
                        </div>
                        <div className=" group-hover/list:translate-x-2 duration-100">
                            <div className="font-bold"><i className="bi bi-discord"></i> {userData.user.discord.name}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="group-hover/list:animate-blink opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
                            <i className="bi bi-chevron-right"></i>
                        </div>
                        <div className="avatar group-hover/list:translate-x-2 duration-100">
                            <div className="mask mask-circle w-12 h-12">
                                <img src={userData.user.github.avatar} alt="Avatar" />
                            </div>
                        </div>
                        <div className=" group-hover/list:translate-x-2 duration-100">
                            <div className="font-bold"><i className="bi bi-github"></i> {userData.user.github.name}</div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
}