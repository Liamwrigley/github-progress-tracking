import React from 'react'
import { useLocation } from 'react-router-dom'

export const Layout = ({ title, children }) => {
    const location = useLocation();
    const isAuthRoute = location.pathname.startsWith('/auth')

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-blue-600 text-white">
                Your Header Content Here
                {isAuthRoute && "we're in an auth route"}
            </header>
            <main className="flex-grow p-4">
                <h1>{title}</h1>
                {children}
            </main>
            <footer className="p-4 bg-gray-800 text-white">
                Your Footer Content Here
            </footer>
        </div>
    )
}