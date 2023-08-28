import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StyledButton } from '../styledButton';
import { Get } from '../../utility/ApiRequest'
import { useQuery } from 'react-query';

const fetchUser = () => Get('/auth/status')

export const Header = ({ links }) => {
    const location = useLocation()
    const isAuthRoute = location.pathname.startsWith('/auth')
    const { data: userData, isLoading, refetch } = useQuery('userData', fetchUser);

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
                {(!isAuthRoute && !userData?.authenticated) &&
                    <div className="flex space-x-4">
                        <StyledButton label={"Login"} to="/auth/login" primary={true} />
                        <StyledButton label={"Setup"} to="/auth/setup" primary={false} />
                    </div>
                }
                {userData && userData.authenticated &&
                    <div className="flex space-x-4">
                        <StyledButton label={"Logout"} to="/auth/logout" primary={true} />
                        <StyledButton label={"Profile"} to={`/profile/${userData.user.discord.id}`} primary={false} />
                    </div>
                }
            </div>
        </header >
    );
}