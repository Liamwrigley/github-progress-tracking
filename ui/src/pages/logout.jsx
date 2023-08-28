import React, { useEffect } from 'react'
import { Get } from '../utility/ApiRequest'
import { Loading } from '../components/loading'
import { useNavigate } from 'react-router-dom';



export const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            await Get('/auth/logout')
            window.location.href = `/`
        }
        logout()
    }, [])

    return (
        <Loading isFetching={true}></Loading>
    )
}