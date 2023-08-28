import React from 'react'
import { Get } from '../utility/ApiRequest'
import { useQuery } from 'react-query';
import { Loading } from '../components/loading';

const fetchUser = () => Get('/auth/status')

export const Profile = () => {
    const { data: userData, isFetching } = useQuery('userData', fetchUser);

    return (
        <Loading isFetching={isFetching && !userData} >
            <div>
                <h2>personal user data</h2>
                {JSON.stringify(userData)}
            </div>
        </Loading>
    )
}