// import React from "react";


// export const Auth = () => {

//     // request to login with discord to start a session




// }









import React, { useState, useEffect } from 'react'
import axios from 'axios'


export const Auth = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    // useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4001/auth/status', {
                headers: {
                },
                withCredentials: true
            })
            console.log(res)
            setData(res.data)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    };

    // fetchData();
    // }, [])

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;
    const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID
    const DISCORD_REDIRECT = () => {
        var callbackUrl = `${process.env.REACT_APP_API_URL}/auth/discord-oauth-callback`
        return `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds&redirect_uri=${callbackUrl}&prompt=none`
    }

    const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT = () => `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo_hook%20repo%20user`


    return (
        <div>
            <div className='flex flex-col gap-4'>
                <h1>Auth test</h1>
                <a className='btn' href={DISCORD_REDIRECT()}>Start Discord Auth Process</a>
                <a className='btn' href={GITHUB_REDIRECT()}>Start Github Auth Process</a>
                <button className='btn' onClick={() => fetchData()}>Test endpoint</button>
                <p>{JSON.stringify(data)}</p>
            </div>
        </div>
    );
}