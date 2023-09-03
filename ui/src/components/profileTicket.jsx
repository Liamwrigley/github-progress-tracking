import React from 'react'

export const ProfileTicket = ({
    activeStep = false,
    showDetails = true,
    dynamic = true,
    url,
    avatar,
    username,
    title,
    type
}) => {

    const typeClass = type === "discord" ? "bi bi-discord" : "bi bi-github"
    const dynamicClass = " hover:scale-105 hover:shadow-lg  "
    const activeClass = " border border-custom-highlight2 hover:scale-105 hover:shadow-lg  "
    const baseClass = "  min-h-[80px] flex flex-col gap-4 bg-black shadow-sm bg-opacity-20 duration-100 w-full p-4  relative "

    const handleClick = () => {
        if (url) {
            window.location.href = url;
        }
    }

    return (
        <div className={baseClass + (activeStep && !showDetails && activeClass) + (!dynamic && dynamicClass)}>
            {title && <p className=' absolute left-2 top-1 text-xs tracking-widest uppercase'><i className={typeClass}></i> {title}</p>}
            {showDetails ?
                <div className="flex flex-row gap-4 justify-center items-center h-full">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            {avatar ?
                                <img src={avatar} alt='avatar' />
                                :
                                <i className={typeClass}></i>
                            }

                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <div className="font-bold opacity-50">{username}</div>
                    </div>
                </div>
                :
                <div className="flex flex-row gap-4 justify-center items-center h-full">
                    <button
                        className={'absolute w-full h-full ' + (activeStep && !showDetails && 'text-white')}
                        disabled={!activeStep}
                        onClick={() => handleClick()}>
                        {url ? "Connect" : "Select"}
                    </button>
                </div>
            }
        </div>
    )
}