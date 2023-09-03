import React, { useEffect } from "react"
import io from 'socket.io-client'
import { Get } from '../utility/ApiRequest'
import { TimeSince } from "../utility/timeHelpers"
import { useQuery, useQueryClient } from 'react-query';
import { Loading } from "../components/loading";
import { useNavigate } from 'react-router-dom'

const IS_PROD = process.env.REACT_APP_PRODUCTION === "true"

const SOCKET_URL = `${process.env.REACT_APP_API_URL}/realtime`
const fetchRealtimeData = () => Get('/realtime');


export const Realtime = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { data: eventData, isFetching } = useQuery('realtimeData', fetchRealtimeData);

    const appendEventData = (newData) => {
        queryClient.setQueryData('realtimeData', old => [newData, ...old]);
    };

    const onRowClick = (id) => {
        navigate(`/user/${id}`)
    }

    useEffect(() => {
        const newSocket = io(SOCKET_URL, { withCredentials: IS_PROD });
        newSocket.on("realtime", (update) => {
            appendEventData(update)
        });

        return () => {
            console.log('closing', newSocket.readyState)
            newSocket.off('/realtime');
            newSocket.close();
        };

    }, []);

    return (
        <Loading isFetching={isFetching && !eventData} >
            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Push #</th>
                            <th>Current Streak</th>
                            <th>Pushed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eventData && eventData.map((data, i) => {
                                const time = TimeSince(data.ts)
                                return (
                                    <tr key={`${i}${data.ts}`} onClick={() => onRowClick(data.discordId)} className="group/list cursor-pointer">
                                        {/* USER */}
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="group-hover/list:animate-blink opacity-0 -translate-x-1 group-hover/list:opacity-100 group-hover/list:translate-x-0 duration-100">
                                                    {/* <i className="bi bi-caret-right-fill"></i> */}
                                                    <i className="bi bi-chevron-right"></i>
                                                </div>
                                                <div className="avatar group-hover/list:translate-x-2 duration-100">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={data.discordAvatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div className=" group-hover/list:translate-x-2 duration-100">
                                                    <div className="font-bold"><i className="bi bi-discord"></i> {data.username}</div>
                                                    <div className="text-sm opacity-50"><i className="bi bi-github"></i> {data.githubName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* PUSH # */}
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <i className="bi bi-cloud-upload"></i> <span>{data.totalPushes}</span>
                                            </div>
                                        </td>
                                        {/* CURRENT STREAK */}
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <span>&#128293;</span> <span>{data.currentStreak}</span>
                                            </div>
                                        </td>
                                        {/* PUSHED */}
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <span>{time}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Loading>
    )
}