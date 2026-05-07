import React, { useState, useEffect, useRef } from 'react'

const CATEGORIES = [
    {
        name: "Charts",
        playlists: [
            { id: "37i9dQZEVXbMDoHDwVN2tF", name: "Top 50 - Global", desc: "Your daily update of the most played tracks globally.", emoji: "🌍", color: "#1e3264" },
            { id: "37i9dQZEVXbLZ52XmnySJg", name: "Top 50 - India", desc: "Your daily update of the most played tracks in India.", emoji: "🇮🇳", color: "#7358ff" },
            { id: "37i9dQZEVXbG9pDOM5KPWU", name: "Viral 50 - Global", desc: "Your daily update of the most viral tracks globally.", emoji: "📈", color: "#e8115b" },
            { id: "37i9dQZEVXbLiJoN9BSB1b", name: "Top 50 - USA", desc: "Most played in the United States.", emoji: "🇺🇸", color: "#509bf5" },
        ],
    },
    {
        name: "Popular",
        playlists: [
            { id: "37i9dQZF1DXcBWIGoYBM5M", name: "Today's Top Hits", desc: "Jung Kook is on top of the Hottest 50!", emoji: "🔥", color: "#e8115b" },
            { id: "37i9dQZF1DY6tAs2XmitNe", name: "Hot Hits India", desc: "India's hottest tracks, updated weekly.", emoji: "🎵", color: "#8d67ab" },
            { id: "37i9dQZF1DWWQbWS0HVjiy", name: "Happy Hits!", desc: "Hits to boost your mood and fill you with sunshine.", emoji: "☀️", color: "#c39b4e" },
        ],
    },
    {
        name: "Bollywood",
        playlists: [
            { id: "37i9dQZF1DWTinV0nuqgUq", name: "Bollywood Butter", desc: "The smoothest Bollywood songs.", emoji: "🎬", color: "#e8115b" },
            { id: "37i9dQZF1DXZvM9bRxHbTb", name: "Bollywood Arenas", desc: "Bollywood's biggest hits.", emoji: "🎭", color: "#c39b4e" },
            { id: "37i9dQZF1DXi0UpvmWwKgz", name: "Filmi Beats", desc: "Evergreen Indian film songs across the decades.", emoji: "👑", color: "#8d67ab" },
        ],
    },
    {
        name: "Mood",
        playlists: [
            { id: "37i9dQZF1DX3rxVfibe1L0", name: "Mood Booster", desc: "Get happy with today's dose of feel-good songs!", emoji: "😊", color: "#e8115b" },
            { id: "37i9dQZF1DX4WYpdgoIcn6", name: "Chill Hits", desc: "Kick back to the best new and recent chill hits.", emoji: "🌊", color: "#1e3264" },
            { id: "37i9dQZF1DXdFsyO2M7xE4", name: "Late Night Vibes", desc: "Slow it down, feel every vibe.", emoji: "🌙", color: "#7358ff" },
            { id: "37i9dQZF1DX2yvmlOdMYzV", name: "Songs to Sing in the Car", desc: "Hit the road with these sing-along tracks.", emoji: "🚗", color: "#27856a" },
        ],
    },
    {
        name: "Focus",
        playlists: [
            { id: "37i9dQZF1DX4sWSpwq3LiO", name: "Peaceful Piano", desc: "Relax and indulge with beautiful piano pieces.", emoji: "🎹", color: "#509bf5" },
            { id: "37i9dQZF1DWZeNistLwieZ", name: "Deep Focus", desc: "Keep calm and focus with ambient and post-rock music.", emoji: "🧠", color: "#27856a" },
            { id: "37i9dQZF1DX8NTLI2TtZa6", name: "lofi beats", desc: "Beats to relax/study to.", emoji: "📚", color: "#ba5d07" },
        ],
    },
    {
        name: "Workout",
        playlists: [
            { id: "37i9dQZF1DWUVpAXiEPK8P", name: "Beast Mode", desc: "Get in the zone with today's hard-hitting hits!", emoji: "💪", color: "#e8115b" },
            { id: "37i9dQZF1DXdxcBWuJkbcy", name: "Power Workout", desc: "Energy blasting songs for your workout session.", emoji: "🏋️", color: "#ba5d07" },
            { id: "37i9dQZF1DX76Wlfdnj7AP", name: "Pump Up", desc: "Get pumped up with the best workout tracks.", emoji: "⚡", color: "#509bf5" },
        ],
    },
    {
        name: "Hip-Hop",
        playlists: [
            { id: "37i9dQZF1DX0XUsuxWHRQd", name: "RapCaviar", desc: "New music from Drake, Travis Scott, Lil Baby.", emoji: "🎤", color: "#8d67ab" },
            { id: "37i9dQZF1DXdERER0HkgFo", name: "Most Necessary", desc: "The best new hip-hop, updated weekly.", emoji: "🎧", color: "#1e3264" },
        ],
    },
]

const ALL_PLAYLISTS = CATEGORIES.flatMap(c => c.playlists.map(p => ({ ...p, category: c.name })))

const BROWSE_GENRES = [
    { name: "Pop", color: "#8d67ab", emoji: "🎵", playlistId: "37i9dQZF1DXcBWIGoYBM5M" },
    { name: "Hip-Hop", color: "#ba5d07", emoji: "🎤", playlistId: "37i9dQZF1DX0XUsuxWHRQd" },
    { name: "Dance", color: "#509bf5", emoji: "🎧", playlistId: "37i9dQZF1DXa2l9eRwXzFO" },
    { name: "Indie", color: "#27856a", emoji: "🎸", playlistId: "37i9dQZF1DX2Nc3B70tvx0" },
    { name: "Rock", color: "#e8115b", emoji: "🤘", playlistId: "37i9dQZF1DWXRqgorJj26U" },
    { name: "R&B", color: "#1e3264", emoji: "🎶", playlistId: "37i9dQZF1DX4SBhb3fqCJd" },
    { name: "Bollywood", color: "#c39b4e", emoji: "🎬", playlistId: "37i9dQZF1DWTinV0nuqgUq" },
    { name: "K-Pop", color: "#7358ff", emoji: "✨", playlistId: "37i9dQZF1DX9tPFwDMOogD" },
    { name: "Classical", color: "#509bf5", emoji: "🎻", playlistId: "37i9dQZF1DX4sWSpwq3LiO" },
    { name: "Jazz", color: "#27856a", emoji: "🎷", playlistId: "37i9dQZF1DXbITWG1ZJKYt" },
    { name: "Chill", color: "#1e3264", emoji: "🌊", playlistId: "37i9dQZF1DX4WYpdgoIcn6" },
    { name: "Workout", color: "#e8115b", emoji: "💪", playlistId: "37i9dQZF1DWUVpAXiEPK8P" },
]

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
}

// ─── Sidebar nav item ──────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '8px 12px', borderRadius: '4px', cursor: 'pointer',
                color: active ? '#fff' : hovered ? '#fff' : '#b3b3b3',
                fontWeight: active ? '700' : '400',
                backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontSize: '13px', transition: 'color 0.1s',
                userSelect: 'none',
            }}
        >
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span>{label}</span>
        </div>
    )
}

// ─── Sidebar playlist row ──────────────────────────────────────────────────────
function SidebarPlaylistItem({ playlist, selected, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '5px 8px', borderRadius: '4px', cursor: 'pointer',
                backgroundColor: selected ? 'rgba(255,255,255,0.1)' : hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
                marginBottom: '1px',
            }}
        >
            <div style={{
                width: '34px', height: '34px', borderRadius: '4px',
                background: playlist.color || '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0,
            }}>
                {playlist.emoji}
            </div>
            <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <div style={{
                    color: selected ? '#1db954' : '#fff',
                    fontSize: '12px', fontWeight: '500',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                    {playlist.name}
                </div>
                <div style={{ color: '#b3b3b3', fontSize: '11px' }}>{playlist.category}</div>
            </div>
        </div>
    )
}

// ─── Playlist card (home grid) ─────────────────────────────────────────────────
function PlaylistCard({ playlist, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? '#282828' : '#181818',
                borderRadius: '8px', padding: '14px', cursor: 'pointer',
                transition: 'background-color 0.2s', minWidth: 0, position: 'relative',
            }}
        >
            <div style={{
                width: '100%', paddingBottom: '100%', position: 'relative',
                borderRadius: '6px', overflow: 'hidden', marginBottom: '12px',
                background: `linear-gradient(135deg, ${playlist.color}, ${playlist.color}88)`,
            }}>
                <span style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', fontSize: '40px',
                }}>
                    {playlist.emoji}
                </span>
                {hovered && (
                    <div style={{
                        position: 'absolute', bottom: '8px', right: '8px',
                        width: '36px', height: '36px', borderRadius: '50%',
                        backgroundColor: '#1db954', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    }}>
                        <span style={{ fontSize: '14px', marginLeft: '2px' }}>▶</span>
                    </div>
                )}
            </div>
            <div style={{
                color: '#fff', fontSize: '12px', fontWeight: '700',
                marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
                {playlist.name}
            </div>
            <div style={{
                color: '#b3b3b3', fontSize: '11px',
                overflow: 'hidden', textOverflow: 'ellipsis',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>
                {playlist.desc}
            </div>
        </div>
    )
}

// ─── Quick-pick card shown at top of Home ──────────────────────────────────────
function QuickPickCard({ playlist, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                backgroundColor: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                borderRadius: '4px', overflow: 'hidden', cursor: 'pointer',
                transition: 'background-color 0.15s', flex: '1 1 160px',
                minWidth: '140px', maxWidth: '220px',
            }}
        >
            <div style={{
                width: '48px', height: '48px', flexShrink: 0,
                background: `linear-gradient(135deg, ${playlist.color}, ${playlist.color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px',
            }}>
                {playlist.emoji}
            </div>
            <span style={{
                color: '#fff', fontWeight: '700', fontSize: '12px',
                paddingRight: '8px', lineHeight: '1.3',
            }}>
                {playlist.name}
            </span>
        </div>
    )
}

// ─── Browse genre card (Search view) ──────────────────────────────────────────
function GenreCard({ genre, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? `${genre.color}cc` : genre.color,
                borderRadius: '8px', padding: '16px 14px 12px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                height: '72px', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', transition: 'filter 0.15s',
                filter: hovered ? 'brightness(1.15)' : 'brightness(1)',
            }}
        >
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>{genre.name}</span>
            <span style={{
                position: 'absolute', bottom: '-4px', right: '8px',
                fontSize: '34px', transform: 'rotate(15deg)', opacity: 0.85,
            }}>
                {genre.emoji}
            </span>
        </div>
    )
}

// ─── Home view ─────────────────────────────────────────────────────────────────
function HomeView({ onSelectPlaylist }) {
    const quickPicks = ALL_PLAYLISTS.slice(0, 6)

    return (
        <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '0 0 16px' }}>
            {/* Gradient header */}
            <div style={{
                background: 'linear-gradient(180deg, #1e3264 0%, #121212 100%)',
                padding: '24px 20px 16px',
            }}>
                <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: '0 0 16px' }}>
                    {getGreeting()} 👋
                </h1>
                {/* Quick-pick grid */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '8px',
                }}>
                    {quickPicks.map(p => (
                        <QuickPickCard key={p.id + p.name} playlist={p} onClick={() => onSelectPlaylist(p)} />
                    ))}
                </div>
            </div>

            {/* Category rows */}
            {CATEGORIES.map(cat => (
                <div key={cat.name} style={{ padding: '0 20px 8px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        margin: '20px 0 12px',
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: 0 }}>
                            {cat.name}
                        </h2>
                        <span style={{ color: '#b3b3b3', fontSize: '11px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' }}>
                            SEE ALL
                        </span>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '12px',
                    }}>
                        {cat.playlists.map(p => (
                            <PlaylistCard
                                key={p.id + p.name}
                                playlist={p}
                                onClick={() => onSelectPlaylist({ ...p, category: cat.name })}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

// ─── Search view ───────────────────────────────────────────────────────────────
function SearchView({ onSelectPlaylist }) {
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)

    const filteredPlaylists = query.trim()
        ? ALL_PLAYLISTS.filter(
            p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.desc.toLowerCase().includes(query.toLowerCase())
        )
        : []

    return (
        <div style={{ height: '100%', overflowY: 'auto', padding: '16px 20px 24px' }}>
            {/* Search bar */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                backgroundColor: '#242424', borderRadius: '24px',
                padding: '8px 16px', marginBottom: '24px',
                border: '1px solid transparent',
            }}>
                <span style={{ fontSize: '16px', color: '#b3b3b3' }}>🔍</span>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="What do you want to listen to?"
                    style={{
                        background: 'none', border: 'none', outline: 'none',
                        color: '#fff', fontSize: '13px', width: '100%',
                    }}
                />
                {query && (
                    <span
                        onClick={() => { setQuery(''); inputRef.current && inputRef.current.focus() }}
                        style={{ color: '#b3b3b3', cursor: 'pointer', fontSize: '14px' }}
                    >
                        ✕
                    </span>
                )}
            </div>

            {/* Search results */}
            {filteredPlaylists.length > 0 ? (
                <>
                    <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>
                        Results for &ldquo;{query}&rdquo;
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '12px',
                    }}>
                        {filteredPlaylists.map(p => (
                            <PlaylistCard key={p.id + p.name} playlist={p} onClick={() => onSelectPlaylist(p)} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>
                        Browse all
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: '10px',
                    }}>
                        {BROWSE_GENRES.map(g => (
                            <GenreCard
                                key={g.name}
                                genre={g}
                                onClick={() => {
                                    const playlist = ALL_PLAYLISTS.find(p => p.id === g.playlistId) || {
                                        id: g.playlistId,
                                        name: g.name,
                                        desc: `Top ${g.name} playlists`,
                                        emoji: g.emoji,
                                        color: g.color,
                                        category: g.name,
                                    }
                                    onSelectPlaylist(playlist)
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// ─── Playlist detail view ──────────────────────────────────────────────────────
function PlaylistDetailView({ playlist, onBack }) {
    const externalUrl = `https://open.spotify.com/playlist/${playlist.id}`

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{
                background: `linear-gradient(180deg, ${playlist.color}99 0%, #121212 100%)`,
                padding: '12px 16px 10px',
                display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                        borderRadius: '50%', width: '28px', height: '28px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: '14px', flexShrink: 0,
                    }}
                >
                    ‹
                </button>
                <span style={{ fontSize: '26px' }}>{playlist.emoji}</span>
                <div>
                    <div style={{ color: '#b3b3b3', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Playlist · {playlist.category}
                    </div>
                    <div style={{ color: '#fff', fontSize: '16px', fontWeight: '800' }}>{playlist.name}</div>
                    <div style={{ color: '#b3b3b3', fontSize: '11px', marginTop: '2px' }}>{playlist.desc}</div>
                </div>
                <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        marginLeft: 'auto',
                        color: '#1db954',
                        fontSize: '11px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Open in Spotify ↗
                </a>
            </div>

            {/* Embed */}
            <iframe
                key={playlist.id}
                src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
                title={playlist.name}
            />
        </div>
    )
}

// ─── Root component ────────────────────────────────────────────────────────────
export default function Spotify() {
    const [activeSection, setActiveSection] = useState('home')
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist)
        setActiveSection('playlist')
    }

    const handleBack = () => {
        setSelectedPlaylist(null)
        setActiveSection('home')
    }

    return (
        <div style={{
            display: 'flex', height: '100%', width: '100%',
            backgroundColor: '#000', fontFamily: "'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            overflow: 'hidden',
        }}>
            {/* ── Sidebar ─────────────────────────────────── */}
            {sidebarOpen && (
                <div style={{
                    width: '210px', minWidth: '210px', backgroundColor: '#000',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                    padding: '6px', overflowY: 'hidden',
                }}>
                    {/* Logo */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 8px 6px',
                    }}>
                        <img src="./themes/Yaru/apps/spotify.png" style={{ width: '26px', height: '26px' }} alt="Spotify" />
                        <span style={{ color: '#fff', fontWeight: '800', fontSize: '15px', letterSpacing: '0.3px' }}>
                            Spotify
                        </span>
                    </div>

                    {/* Nav */}
                    <div style={{ backgroundColor: '#121212', borderRadius: '8px', padding: '6px' }}>
                        <NavItem
                            icon="🏠" label="Home"
                            active={activeSection === 'home'}
                            onClick={() => { setActiveSection('home'); setSelectedPlaylist(null) }}
                        />
                        <NavItem
                            icon="🔍" label="Search"
                            active={activeSection === 'search'}
                            onClick={() => { setActiveSection('search'); setSelectedPlaylist(null) }}
                        />
                    </div>

                    {/* Library */}
                    <div style={{
                        backgroundColor: '#121212', borderRadius: '8px',
                        padding: '6px', flex: 1, overflowY: 'auto', minHeight: 0,
                    }}>
                        <div style={{
                            color: '#fff', fontWeight: '700', fontSize: '12px',
                            padding: '6px 8px 8px',
                            display: 'flex', alignItems: 'center', gap: '6px',
                        }}>
                            <span>📚</span><span>Your Library</span>
                        </div>
                        {ALL_PLAYLISTS.map((p, i) => (
                            <SidebarPlaylistItem
                                key={p.id + i}
                                playlist={p}
                                selected={selectedPlaylist && selectedPlaylist.id === p.id && selectedPlaylist.name === p.name}
                                onClick={() => handleSelectPlaylist(p)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Main area ────────────────────────────────── */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                backgroundColor: '#121212', overflow: 'hidden', minWidth: 0,
            }}>
                {/* Top bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', backgroundColor: '#121212', flexShrink: 0,
                    borderBottom: '1px solid #282828',
                }}>
                    <button
                        onClick={() => setSidebarOpen(v => !v)}
                        title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        style={{
                            background: 'rgba(255,255,255,0.07)', border: 'none', color: '#fff',
                            borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                        }}
                    >
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                    {activeSection === 'playlist' && selectedPlaylist && (
                        <button
                            onClick={handleBack}
                            style={{
                                background: 'rgba(255,255,255,0.07)', border: 'none', color: '#fff',
                                borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                            }}
                        >
                            ‹
                        </button>
                    )}
                    <div style={{ flex: 1 }} />
                    <div style={{
                        display: 'flex', gap: '6px',
                    }}>
                        {['home', 'search'].map(sec => (
                            <button
                                key={sec}
                                onClick={() => { setActiveSection(sec); setSelectedPlaylist(null) }}
                                style={{
                                    background: activeSection === sec ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
                                    border: 'none', color: activeSection === sec ? '#fff' : '#b3b3b3',
                                    borderRadius: '12px', padding: '4px 12px', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: '600', textTransform: 'capitalize',
                                }}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        backgroundColor: '#535353', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#fff', fontSize: '12px',
                        fontWeight: '700', cursor: 'default', userSelect: 'none', marginLeft: '4px',
                    }}>
                        L
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {activeSection === 'playlist' && selectedPlaylist
                        ? <PlaylistDetailView playlist={selectedPlaylist} onBack={handleBack} />
                        : activeSection === 'search'
                            ? <SearchView onSelectPlaylist={handleSelectPlaylist} />
                            : <HomeView onSelectPlaylist={handleSelectPlaylist} />
                    }
                </div>
            </div>
        </div>
    )
}

export const displaySpotify = () => {
    return <Spotify />;
}
