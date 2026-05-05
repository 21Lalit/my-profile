import React from 'react'

export default function Youtube() {
    return (
        <iframe src="https://www.youtube.com/embed/videoseries?list=UUMACUMxAbXmudfrmEVBIeWw" style={{ border: 'none' }} title="YouTube" className="h-full w-full bg-ub-cool-grey"></iframe>
    )
}

export const displayYoutube = () => {
    return <Youtube />;
}
