import React from 'react'
import { Header } from './header';
import { Footer } from './footer';
import { Body } from './body';
import { useLocation } from 'react-router-dom';
import { Toast } from './toast';

const formatTitle = (str) => {
    var title = str
    if (str.startsWith("/user")) {
        title = "/user"
    }
    return `./${title.replace("/", "")}`
}

export const Layout = ({ links, children }) => {
    const location = useLocation()
    console.log(location)
    const currentLink = links.find(link => link.route === location.pathname)
    const title = currentLink ? `./${currentLink.displayName}` : formatTitle(location.pathname)

    return (
        <div className="flex flex-col min-h-screen">
            <Header links={links} />
            <Body title={title}>
                {children}
            </Body>
            <Footer />
            <Toast />
        </div>
    )
}