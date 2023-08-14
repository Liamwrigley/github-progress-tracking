import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import { Get } from '../utility/ApiRequest'
import { DiscordProfile } from "../components/discordProfile"
import { TimeUntilOrSince } from "../components/timeUntilOrSince"


const SOCKET_URL = `${process.env.REACT_APP_API_URL}/realtime`

export const Realtime = () => {
    const [socket, setSocket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [eventData, setEventData] = useState([])

    useEffect(() => {

        const fetchDataAndInitSocket = async () => {
            try {
                const initialData = await Get("/realtime");
                setEventData(initialData);
                setLoading(false);

                const newSocket = io(SOCKET_URL);
                newSocket.on("/realtime", (update) => {
                    console.log('recieved data from /realtime');
                    setEventData(prevData => ([update, ...prevData]));
                });

                setSocket(newSocket);

            } catch (err) {
                setLoading(false);
                console.log('failed in realtime', err);
            }
        };

        fetchDataAndInitSocket();

        // Cleanup logic
        return () => {
            if (socket) {
                socket.off('/realtime');
                socket.close();
            }
        };

    }, []);


    return (
        <>
            <p>Realtime goes here.</p>
            <p>loading: {loading.toString()}</p>
            {eventData.map(data => {
                const time = TimeUntilOrSince(data.ts)
                return (
                    <div className="columns-4">
                        <DiscordProfile name={data.username} avatar={data.discordAvatar} />
                        <p>{data.currentStreak}</p>
                        <p>{data.totalPushes}</p>
                        <p>{time}</p>
                    </div>
                )
            })}

        </>
    )
}