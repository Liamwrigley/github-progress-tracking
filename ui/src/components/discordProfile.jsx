import React from "react";

export const DiscordProfile = ({ name, avatar }) => {


    return (
        <div className="">
            <img src={avatar} className="" alt="avatar" />
            <span>{name}</span>
        </div>
    )
}