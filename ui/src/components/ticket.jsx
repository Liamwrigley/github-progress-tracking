import React from 'react'

export const Ticket = ({ title, bsIcon, icon, children }) => {
    return (
        <div className='min-h-[80px] flex flex-col gap-4 bg-black shadow-sm bg-opacity-20 duration-100 w-full p-4 relative hover:scale-105 hover:shadow-lg'>
            {title && <p className=' absolute left-2 top-1 text-xs tracking-widest uppercase'>{bsIcon ? <i className={bsIcon}></i> : <span>{icon}</span>} {title}</p>}
            <div className="flex flex-row gap-4 justify-center items-center h-full">
                {children}
            </div>
        </div>
    )
}