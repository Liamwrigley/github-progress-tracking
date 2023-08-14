import React, { useEffect, useState } from "react"
import { Get } from '../utility/ApiRequest'


export const Leaderboard = () => {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const initialData = await Get("/auth/testing2")
                setUserData(initialData)
                setLoading(false)

            } catch (err) {
                setLoading(false)

            }
        }

        getData();
    })


    return (
        <p>Leaderboard goes here.</p>
    )
}