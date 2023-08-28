import React from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { SelectRepo } from '../components/selectRepo';
import { Stepper } from '../components/auth/stepper';
import { Loading } from '../components/loading';


const fetchUser = () => Get('/auth/status')


export const AuthSetup = () => {
    const { data: userData, isFetching, refetch } = useQuery('userData', fetchUser);
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
    console.log(userData)
    const resolve = (v) => v ? true : false

    const steps = [
        { text: "Discord", status: resolve(userData?.user?.discord?.id) && resolve(!userData?.needsDiscordToken) },// && resolve(userData?.user?.github?.id || userData.needsGithubToken) && resolve(userData?.user?.github?.repoName) },
        { text: "Github", status: resolve(userData?.user?.github?.id) && resolve(!userData?.needsGithubToken) },// && resolve(userData?.user?.github?.repoName) },
        { text: "Select Repo", status: resolve(userData?.user?.setupComplete) },
    ]

    return (
        <Loading isFetching={isFetching && !userData}>
            <div className="flex flex-col gap-4">
                <Stepper steps={steps} />
                <div className="divider"></div>
                <a href={DISCORD_REDIRECT()} >discord</a>
                <a href={GITHUB_REDIRECT()} >github</a>
                <div className="flex flex-row gap-4 justify-between">
                    <div className='prose m-w-none '>
                        <h3>Discord</h3>
                        <ul>
                            <li><strong>Image: </strong>img</li>
                            <li><strong>Name: </strong>Mesiya</li>
                        </ul>
                    </div>
                    <div className='prose m-w-none '>
                        <h3>Github</h3>
                        <ul>
                            <li><strong>Image: </strong>img</li>
                            <li><strong>Name: </strong>Mesiya</li>
                            <li><strong>Repo: </strong>XYZHAH</li>
                            <li><strong>Other GIthub Info: </strong>asdasdh akjsdhaksj dhaksjdh asd</li>
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
            </div >
        </Loading>
        // <div>
        //     <div className='flex flex-col gap-4'>
        //         {userData?.user && <>
        //             <div className="flex items-center space-x-3">
        //                 <div className="group-hover/list:animate-blink opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
        //                     <i className="bi bi-chevron-right"></i>
        //                 </div>
        //                 <div className="avatar group-hover/list:translate-x-2 duration-100">
        //                     <div className="mask mask-circle w-12 h-12">
        //                         <img src={userData.user.discord.avatar} alt="Avatar" />
        //                     </div>
        //                 </div>
        //                 <div className=" group-hover/list:translate-x-2 duration-100">
        //                     <div className="font-bold"><i className="bi bi-discord"></i> {userData.user.discord.name}</div>
        //                 </div>
        //             </div>
        //             <div className="flex items-center space-x-3">
        //                 <div className="group-hover/list:animate-blink opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
        //                     <i className="bi bi-chevron-right"></i>
        //                 </div>
        //                 <div className="avatar group-hover/list:translate-x-2 duration-100">
        //                     <div className="mask mask-circle w-12 h-12">
        //                         <img src={userData.user.github.avatar} alt="Avatar" />
        //                     </div>
        //                 </div>
        //                 <div className=" group-hover/list:translate-x-2 duration-100">
        //                     <div className="font-bold"><i className="bi bi-github"></i> {userData.user.github.name}</div>
        //                 </div>
        //             </div>
        //         </>}
        //     </div>
        // </div>
    );
}