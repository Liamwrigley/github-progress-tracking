import React from "react";

export const Body = ({ title, children }) => {
    return (
        <main className="flex-grow flex m-10 mt-14 bg-custom-primarybg text-custom-primarytext">
            <div className="relative border-2 border-custom-secondarytext flex-grow p-8 pt-14 bg-custom-secondarybg text-custom-secondarytext mx-auto">
                {title &&
                    <div className="pointer-events-none absolute -top-6 shadow-xl px-4 py-2 border-custom-highlight2 bg-custom-highlight2 text-white">
                        <h1 className="text-xl uppercase tracking-widest">{title}</h1>
                    </div>
                }
                {children}
            </div>
        </main>
    )
}