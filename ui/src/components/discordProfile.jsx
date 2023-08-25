import React from "react";

export const DiscordProfile = ({ name, avatar, basis = 4 }) => {
    return (
        <>
            <img src={avatar} className="w-8 rounded-full group-hover:rotate-12 duration-300" alt="avatar" />
            <strong>{name}</strong>
        </>
    )
}