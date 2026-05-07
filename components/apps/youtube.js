import React from 'react'

export default function Youtube() {
    return (
        <div className="h-full w-full flex flex-col bg-ub-cool-grey">
            <div className="flex items-center justify-between px-4 py-2 text-white text-sm bg-black bg-opacity-20">
                <span>YouTube</span>
                <a
                    href="https://www.youtube.com/@LiveOverflow/videos"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ubt-blue hover:underline"
                >
                    Open in new tab
                </a>
            </div>
            <iframe
                src="https://www.youtube-nocookie.com/embed/videoseries?list=UUUMxAbXmudfrmEVBIeWw"
                style={{ border: 'none' }}
                title="YouTube"
                className="h-full w-full bg-ub-cool-grey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export const displayYoutube = () => {
    return <Youtube />;
}
