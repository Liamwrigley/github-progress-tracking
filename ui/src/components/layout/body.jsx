import React from "react";
import { Title } from "./title";

export const Body = ({ title, children }) => {
    return (
        <main className="flex-grow flex m-10 mt-14 bg-custom-primarybg text-custom-primarytext">
            <div className="relative border-2 border-custom-secondarytext flex-grow p-8 pt-14 bg-custom-secondarybg text-custom-secondarytext mx-auto">
                <Title title={title} />
                {children}
            </div>
        </main>
    )
}