import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StyledButton } from '../styledButton';

export const Header = ({ links }) => {
    const location = useLocation()
    const isAuthRoute = location.pathname.startsWith('/auth')

    return (
        <header className="p-4 bg-custom-secondarybg text-custom-secondarytext z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-10">
                    {links.map((link, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={link.route}
                                className={({ isActive }) => `${isActive ? "active text-custom-highlight" : "translate-y-[1rem] "}  relative p-2 block hover:text-custom-highlight transition duration-300 custom-link`}
                            >
                                {link.displayName}
                            </NavLink>
                        )
                    })}
                </div>
                {!isAuthRoute &&
                    <div className="flex space-x-4">
                        <StyledButton label={"Setup Auth"} to="/auth" primary={false} />
                        <StyledButton label={"Revoke"} to="/auth/revoke" primary={true} />
                    </div>
                }
            </div>
        </header >
    );
}