import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import { Get } from '../utility/ApiRequest'
import { DiscordProfile } from "../components/discordProfile"
import { TimeSince } from "../utility/timeHelpers"


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
            {eventData.map(data => {
                const time = TimeSince(data.ts)
                return (
                    <div className="flex pb-4 group flex-row justify-start  items-center">
                        <DiscordProfile name={data.username} avatar={data.discordAvatar} />
                        <div className="basis-1/4" ><strong>Current Streak: <span>&#128293;</span></strong>{data.currentStreak}</div>
                        <div className="basis-1/4" ><strong>Push #: </strong><i class="bi bi-github"></i> {data.totalPushes}</div>
                        <div className="basis-1/4" ><strong></strong>{time}</div>
                    </div>
                )
            })}

        </>
    )
}