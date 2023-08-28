import React, { useEffect } from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { Loading } from '../components/loading';
import { useNavigate } from 'react-router-dom';

const fetchUser = () => Get('/auth/status')

export const Login = () => {
    const { data: userData, isFetching, isLoading } = useQuery('userData', fetchUser);
    const navigate = useNavigate()

    const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID
    const DISCORD_REDIRECT = () => {
        var callbackUrl = `${process.env.REACT_APP_API_URL}/auth/discord-oauth-callback`
        return `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds&redirect_uri=${callbackUrl}&prompt=none`
    }
    useEffect(() => {
        if (!isLoading) {
            if (userData.authenticated && userData.user && userData.user.setupComplete) {
                navigate(`/profile/${userData.user.discord.id}`)
                // window.location.href = `/profile/${userData.user.discord.id}`
            } else {
                window.location.href = DISCORD_REDIRECT()
            }
        }
    }, [isLoading])


    return (
        <Loading isFetching={isFetching && !userData}>

        </Loading>
    )
}