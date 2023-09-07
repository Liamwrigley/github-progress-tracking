import React from 'react'
import { Ticket } from './ticket'

export const UserTicket = ({ title, bsIcon, icon, avatar, username }) => {
    return (
        <Ticket title={title} bsIcon={bsIcon} icon={icon}>
            <div className="flex flex-row gap-4 justify-center items-center h-full">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        {avatar ?
                            <img src={avatar} alt='avatar' />
                            :
                            <span className="text-3xl uppercase">{username.split("")[0]}</span>
                        }
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className="font-bold ">{username}</div>
                </div>
            </div>
        </Ticket>
    )
}