import React, { useState, useEffect } from 'react'
import axios from 'axios'


export const Auth = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    // useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('/auth/testing', {
                headers: {
                }
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

    return (
        <div>
            <h1>Auth test</h1>
            <div>
                <a href={DISCORD_REDIRECT()}>Start Auth Process</a>
            </div>
            <div>
                <button onClick={() => fetchData()}>Test endpoint</button>
                <p>{JSON.stringify(data)}</p>
            </div>
        </div>
    );
}