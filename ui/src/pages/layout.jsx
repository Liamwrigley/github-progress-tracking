import React from 'react'
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Body } from '../components/body';
import { useLocation } from 'react-router-dom';

export const Layout = ({ links, children }) => {
    const location = useLocation()
    console.log(location)
    const currentLink = links.find(link => link.route === location.pathname)
    const title = currentLink ? `./${currentLink.displayName}` : `<${location.pathname.replace("/", "")} />`

    return (
        <div className="flex flex-col min-h-screen">

            <Header links={links} />
            <Body title={title}>
                {children}
            </Body>
            <Footer />
        </div>
    )
}