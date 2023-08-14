import React from "react"

export const Title = ({ title }) => {

    return (
        <>
            {
                title &&
                <div className="z-20 pointer-events-none absolute -top-6 shadow-xl px-4 py-2 border-custom-highlight2 bg-custom-highlight2 text-white">
                    <h1 className="text-xl uppercase tracking-widest">{title}</h1>
                </div>
            }
        </>

    )
}