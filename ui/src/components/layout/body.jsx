import React from "react";
import { Title } from "./title";

export const Body = ({ title, children }) => {
    return (
        <main className="relative flex-grow flex p-10 pt-14  bg-custom-primarybg text-custom-primarytext">
            <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 opacity-10 bg-gradient-to-tr from-blue-700 via-violet-800 to-fuchsia-900"></div>
            <div className="absolute w-screen opacity-30 -inset-2 rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600 via-violet-600 to-orange-600 opacity-50 blur-2xl"></div>
            <div className="relative p-8 pt-14 bg-custom-secondarybg text-custom-secondarytext  w-full mx-10 break-words">
                <Title title={title} />
                {children}
            </div>
        </main>
    )
}