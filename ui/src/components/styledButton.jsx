import React from 'react'
import { useNavigate } from 'react-router-dom'

export const StyledButton = ({ label, to, primary = true, ...props }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    const backgroundType = primary ? " bg-custom-highlight" : " bg-custom-highlight2"
    const baseClasses = "styled-button px-4 py-1 relative overflow-hidden border-2 hover:text-white transition-all duration-300 ease-in-out";
    const highlightClasses = primary ? "text-custom-highlight border-custom-highlight hover:bg-custom-highlight" : "text-custom-highlight2 border-custom-highlight2 hover:bg-custom-highlight2";

    return (
        <div className="group relative" onClick={handleClick}>
            <button
                className={`${baseClasses} ${highlightClasses}`} {...props}
            >
                {label}
                <span className={`absolute inset-0 transform -skew-x-12 -skew-y-12 ${backgroundType} scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </button>
        </div>
    );
}