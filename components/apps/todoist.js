import React, { useEffect, useState } from 'react';

let fallbackIdCounter = 0;

const createId = () => {
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
        if (typeof globalThis.crypto.randomUUID === 'function') {
            return globalThis.crypto.randomUUID();
        }
        if (typeof globalThis.crypto.getRandomValues === 'function') {
            const bytes = new Uint8Array(16);
            globalThis.crypto.getRandomValues(bytes);
            return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        }
    }
    fallbackIdCounter += 1;
    return `fallback-${Date.now()}-${fallbackIdCounter}`;
};

export default function Todoist() {
    const [tasks, setTasks] = useState([]);
    const [value, setValue] = useState('');
    const [storageKey, setStorageKey] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let sessionId = window.sessionStorage.getItem('todo-session-id');
        if (!sessionId) {
            sessionId = createId();
            window.sessionStorage.setItem('todo-session-id', sessionId);
        }

        const key = `todo-items-${sessionId}`;
        setStorageKey(key);

        const saved = window.sessionStorage.getItem(key);
        if (saved) {
            try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setTasks(parsed);
            } catch (error) {
                console.error('Failed to parse session todo data:', error);
                window.sessionStorage.removeItem(key);
            }
        }
    }, []);

    useEffect(() => {
        if (!storageKey || typeof window === 'undefined') return;
        window.sessionStorage.setItem(storageKey, JSON.stringify(tasks));
    }, [tasks, storageKey]);

    const remaining = tasks.filter((task) => !task.done).length;

    const addTask = (e) => {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;

        setTasks((prev) => [...prev, { id: createId(), text, done: false }]);
        setValue('');
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.done));
    };

    return (
        <div className="h-full w-full flex flex-col bg-ub-cool-grey text-white">
            <div className="flex items-center justify-between px-4 py-2 text-sm bg-black bg-opacity-20 border-b border-gray-700">
                <span>Todo List (Session Only)</span>
                <span className="text-gray-300">{remaining} pending</span>
            </div>

            <form onSubmit={addTask} className="flex items-center gap-2 p-3 border-b border-gray-700">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add a task..."
                    className="flex-grow px-3 py-2 rounded bg-ub-grey text-white outline-none border border-gray-600 focus:border-ubt-blue"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="px-3 py-2 rounded bg-ub-orange text-white hover:bg-opacity-90"
                >
                    Add
                </button>
            </form>

            <div className="flex-grow overflow-y-auto px-3 py-2">
                {tasks.length === 0 ? (
                    <p className="text-gray-300 text-sm">No tasks yet for this session.</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between gap-2 px-2 py-2 mb-2 bg-black bg-opacity-20 rounded"
                        >
                            <label className="flex items-center gap-2 flex-grow cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className={task.done ? 'line-through text-gray-400' : ''}>
                                    {task.text}
                                </span>
                            </label>
                            <button
                                type="button"
                                onClick={() => deleteTask(task.id)}
                                className="text-red-300 hover:text-red-200 text-xs"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {tasks.some((task) => task.done) ? (
                <div className="p-3 border-t border-gray-700">
                    <button
                        type="button"
                        onClick={clearCompleted}
                        className="text-xs text-gray-200 hover:text-white"
                    >
                        Clear completed
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export const displayTodoist = () => {
    return <Todoist />;
};
