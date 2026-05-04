import React, { useState } from 'react';
import ReactGA from 'react-ga4';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldjoezb";

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/21Lalit",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.96 10.96 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/lalit-rohilla",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:lalitrohilla2005@gmail.com",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

function ContactMe() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!form.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: form.message,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
                ReactGA.event({ category: 'Contact', action: 'Message Sent', label: form.name });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const lineNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className="w-full h-full flex flex-col bg-ub-gedit-darker text-white select-none overflow-hidden">
            {/* Gedit-style tab bar */}
            <div className="flex items-center bg-ub-gedit-dark border-b border-black border-opacity-40 px-2 pt-1 text-xs">
                <div className="flex items-center bg-ub-gedit-darker rounded-t px-3 py-1 border-t border-l border-r border-gray-600 border-opacity-50 text-gray-200">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-ubt-gedit-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact.md
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Line numbers gutter */}
                <div className="hidden md:flex flex-col items-end pr-3 pt-4 bg-ub-gedit-darker text-gray-600 text-xs font-mono select-none min-w-8 border-r border-black border-opacity-30">
                    {lineNumbers.map(n => (
                        <span key={n} className="leading-6">{n}</span>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-y-auto windowMainScreen p-4 md:p-6">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-10">
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-xl font-bold text-ubt-gedit-blue mb-2">Message Sent!</h2>
                            <p className="text-gray-300 text-sm mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="px-4 py-2 bg-ub-gedit-light hover:bg-opacity-80 text-white rounded text-sm transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-6">
                                <div className="text-ubt-gedit-orange font-mono text-sm mb-1"># Contact Me</div>
                                <p className="text-gray-300 text-sm font-mono">
                                    <span className="text-ubt-gedit-blue">{">"}</span> Fill out the form below or reach me through social links.
                                </p>
                            </div>

                            {/* Social links */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {SOCIAL_LINKS.map(link => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-ub-gedit-light bg-opacity-60 hover:bg-opacity-100 rounded text-xs text-gray-200 transition-colors border border-gray-700 border-opacity-50"
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="text-gray-600 font-mono text-xs mb-4">{'─'.repeat(40)}</div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-ubt-gedit-blue font-mono text-xs mb-1">
                                            <span className="text-ubt-gedit-orange">const</span> name <span className="text-gray-400">=</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className={`w-full bg-ub-gedit-dark text-gray-100 text-sm font-mono px-3 py-2 rounded border ${errors.name ? 'border-red-500' : 'border-gray-700 border-opacity-60 focus:border-ubt-gedit-blue'} outline-none transition-colors placeholder-gray-600`}
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-ubt-gedit-blue font-mono text-xs mb-1">
                                            <span className="text-ubt-gedit-orange">const</span> email <span className="text-gray-400">=</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className={`w-full bg-ub-gedit-dark text-gray-100 text-sm font-mono px-3 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-700 border-opacity-60 focus:border-ubt-gedit-blue'} outline-none transition-colors placeholder-gray-600`}
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-ubt-gedit-blue font-mono text-xs mb-1">
                                        <span className="text-ubt-gedit-orange">const</span> subject <span className="text-gray-400">=</span>
                                        <span className="text-gray-500 ml-1">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="What's this about?"
                                        className="w-full bg-ub-gedit-dark text-gray-100 text-sm font-mono px-3 py-2 rounded border border-gray-700 border-opacity-60 focus:border-ubt-gedit-blue outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-ubt-gedit-blue font-mono text-xs mb-1">
                                        <span className="text-ubt-gedit-orange">const</span> message <span className="text-gray-400">=</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className={`w-full bg-ub-gedit-dark text-gray-100 text-sm font-mono px-3 py-2 rounded border ${errors.message ? 'border-red-500' : 'border-gray-700 border-opacity-60 focus:border-ubt-gedit-blue'} outline-none transition-colors placeholder-gray-600 resize-none`}
                                    />
                                    {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                                </div>

                                {/* Error banner */}
                                {status === 'error' && (
                                    <div className="flex items-center gap-2 bg-red-900 bg-opacity-40 border border-red-600 border-opacity-50 rounded px-3 py-2 text-red-300 text-xs font-mono">
                                        <span>⚠</span>
                                        <span>Failed to send message. Please try again or email me directly.</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-gray-600 text-xs font-mono hidden md:block">// Ctrl+Enter to send</span>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="flex items-center gap-2 px-5 py-2 bg-ub-orange hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded transition-colors"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Gedit-style status bar */}
            <div className="flex items-center justify-between bg-ub-gedit-dark border-t border-black border-opacity-40 px-3 py-0.5 text-gray-500 text-xs font-mono">
                <span>contact.md</span>
                <div className="flex gap-4">
                    <span>Ln 1, Col 1</span>
                    <span>UTF-8</span>
                    <span>Markdown</span>
                </div>
            </div>
        </div>
    );
}

export default ContactMe;

export const displayGedit = () => {
    return <ContactMe />;
}
