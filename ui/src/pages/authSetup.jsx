import React from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { SelectRepo } from '../components/selectRepo';
import { Stepper } from '../components/auth/stepper';
import { Loading } from '../components/loading';
import { ProfileTicket } from '../components/profileTicket';
import { Profile } from './profile';


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
        { key: "discord", text: "Discord", status: resolve(userData?.user?.discord?.id) && resolve(!userData?.needsDiscordToken) },// && resolve(userData?.user?.github?.id || userData.needsGithubToken) && resolve(userData?.user?.github?.repoName) },
        { key: "github", text: "Github", status: resolve(userData?.user?.github?.id) && resolve(!userData?.needsGithubToken) },// && resolve(userData?.user?.github?.repoName) },
        { key: "repo", text: "Select Repo", status: resolve(userData?.user?.setupComplete) },
    ]

    const activeStep = (key) => steps[steps.findIndex(s => !s.status)].key === key

    return (
        <Loading isFetching={isFetching && !userData}>
            <div className="flex flex-col gap-4">
                {/* <Stepper steps={steps} /> */}



                <div className="flex flex-row gap-4 justify-between pt-4">
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <ProfileTicket
                            activeStep={activeStep(steps[0].key)}
                            showButton={steps[0].status}
                            url={DISCORD_REDIRECT()}
                            avatar={userData?.user?.[steps[0].key]?.avatar}
                            username={userData?.user?.[steps[0].key]?.name}
                            title={steps[0].text}
                            type={steps[0].key}
                        />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <ProfileTicket
                            activeStep={activeStep(steps[1].key)}
                            showButton={steps[1].status}
                            url={GITHUB_REDIRECT()}
                            avatar={userData?.user?.[steps[1].key]?.avatar}
                            username={userData?.user?.[steps[1].key]?.name}
                            title={steps[1].text}
                            type={steps[1].key} />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <ProfileTicket
                            activeStep={activeStep(steps[2].key)}
                            showButton={steps[2].status}
                            avatar={userData?.user?.[steps[1].key]?.avatar}
                            username={userData?.user?.[steps[1].key]?.repo}
                            title={steps[2].text}
                            type={steps[2].key} >
                        </ProfileTicket>
                        {/* {userData && steps[2].status ? <>
                            <div>{userData.user.github.repoName}</div>
                        </> : <a disabled={activeStep(steps[2].key)} href="/go" >Select Repo - {activeStep(steps[2].key) ? "Y" : "N"}</a>} */}
                    </div>
                </div>
                {activeStep(steps[2].key) &&
                    <>
                        <div className="divider"></div>
                        <div>
                            <SelectRepo user={userData} refetch={refetch} />
                        </div>
                    </>
                }



                <div className="divider"></div>
                <p>{JSON.stringify(activeStep())}</p>
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
    );
}