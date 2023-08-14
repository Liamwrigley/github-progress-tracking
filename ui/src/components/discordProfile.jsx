import React from "react";

export const DiscordProfile = ({ name, avatar, basis = 4 }) => {


    return (
        <div className={`basis-1/${basis} flex flex-row justify-start gap-4  items-center`}>
            <img src={avatar} className="w-8 rounded-full group-hover:rotate-12 duration-300" alt="avatar" />
            <strong>{name}</strong>
        </div>
    )
}