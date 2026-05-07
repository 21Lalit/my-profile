import React from 'react'

export default function Todoist() {
    return (
        <div className="h-full w-full flex flex-col bg-ub-cool-grey">
            <div className="flex items-center justify-between px-4 py-2 text-white text-sm bg-black bg-opacity-20">
                <span>Todo List</span>
                <a
                    href="https://app.todoist.com/app/today"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ubt-blue hover:underline"
                >
                    Open in new tab
                </a>
            </div>
            <iframe
                src="https://app.todoist.com/app/today"
                style={{ border: 'none' }}
                title="Todoist"
                className="h-full w-full"
            ></iframe>
        </div>
    )
}

export const displayTodoist = () => {
    return <Todoist />;
}
