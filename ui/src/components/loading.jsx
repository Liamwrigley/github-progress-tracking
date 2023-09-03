import React, { useState, useEffect } from 'react';

const FADE_OUT_DURATION = 500; // This should match the CSS transition duration

export const Loading = ({ isFetching, children }) => {
    const [showLoader, setShowLoader] = useState(isFetching);
    const [fadeLoader, setFadeLoader] = useState(false);

    useEffect(() => {
        let timeout;

        if (!isFetching) {
            setFadeLoader(true);
            timeout = setTimeout(() => {
                setShowLoader(false);
                setFadeLoader(false);
            }, FADE_OUT_DURATION);
        } else {
            setShowLoader(true);
        }

        return () => clearTimeout(timeout);
    }, [isFetching]);

    const loadingClass = 'overlay bg-custom-secondarybg fade-out';
    const loadedClass = 'overlay bg-custom-secondarybg';
    const currentClass = fadeLoader ? loadingClass : loadedClass;

    return (
        <div className="content-container">
            {children}
            {showLoader && (
                <div className={currentClass}>
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            )}
        </div>
    );
}