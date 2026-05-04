import React, { useState } from 'react'

const playlists = [
    { id: "37i9dQZEVXbMDoHDwVN2tF", name: "Top 50 - Global", category: "Charts", emoji: "🌍" },
    { id: "37i9dQZEVXbLZ52XmnySJg", name: "Top 50 - India", category: "Charts", emoji: "🇮🇳" },
    { id: "37i9dQZF1DXcBWIGoYBM5M", name: "Today's Top Hits", category: "Popular", emoji: "🔥" },
    { id: "37i9dQZEVXbG9pDOM5KPWU", name: "Viral 50 - Global", category: "Charts", emoji: "📈" },
    { id: "37i9dQZF1DY6tAs2XmitNe", name: "Hot Hits India", category: "Popular", emoji: "🎵" },
    { id: "37i9dQZF1DWTinV0nuqgUq", name: "Bollywood Butter", category: "Bollywood", emoji: "🎬" },
    { id: "37i9dQZF1DX3rxVfibe1L0", name: "Mood Booster", category: "Mood", emoji: "😊" },
    { id: "37i9dQZF1DX4WYpdgoIcn6", name: "Chill Hits", category: "Mood", emoji: "🌊" },
    { id: "37i9dQZF1DX4sWSpwq3LiO", name: "Peaceful Piano", category: "Focus", emoji: "🎹" },
    { id: "37i9dQZF1DWUVpAXiEPK8P", name: "Beast Mode", category: "Workout", emoji: "💪" },
    { id: "37i9dQZF1DX0XUsuxWHRQd", name: "RapCaviar", category: "Hip-Hop", emoji: "🎤" },
    { id: "37i9dQZF1DXdxcBWuJkbcy", name: "Power Workout", category: "Workout", emoji: "🏋️" },
]

function NavItem({ icon, label, active, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '8px 12px', borderRadius: '4px', cursor: 'pointer',
                color: active ? '#fff' : '#b3b3b3',
                fontWeight: active ? '700' : '400',
                backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontSize: '13px',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#b3b3b3' }}
        >
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span>{label}</span>
        </div>
    )
}

function PlaylistItem({ playlist, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '6px 8px', borderRadius: '4px', cursor: 'pointer',
                backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'transparent',
                marginBottom: '2px',
            }}
            onMouseEnter={e => { if (!selected) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={e => { if (!selected) e.currentTarget.style.backgroundColor = 'transparent' }}
        >
            <div style={{
                width: '36px', height: '36px', borderRadius: '4px',
                backgroundColor: '#333', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', flexShrink: 0,
            }}>
                {playlist.emoji}
            </div>
            <div style={{ overflow: 'hidden' }}>
                <div style={{
                    color: selected ? '#1db954' : '#fff', fontSize: '12px',
                    fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                    {playlist.name}
                </div>
                <div style={{ color: '#b3b3b3', fontSize: '11px' }}>{playlist.category}</div>
            </div>
        </div>
    )
}

export default function Spotify() {
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0])
    const [activeSection, setActiveSection] = useState('home')

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: '#000', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{ width: '220px', minWidth: '220px', backgroundColor: '#000', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px', overflowY: 'auto' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 8px 4px' }}>
                    <img src="./themes/Yaru/apps/spotify.png" style={{ width: '28px', height: '28px' }} alt="Spotify" />
                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>Spotify</span>
                </div>

                {/* Nav */}
                <div style={{ backgroundColor: '#121212', borderRadius: '8px', padding: '6px' }}>
                    <NavItem icon="🏠" label="Home" active={activeSection === 'home'} onClick={() => setActiveSection('home')} />
                    <NavItem icon="🔍" label="Search" active={activeSection === 'search'} onClick={() => setActiveSection('search')} />
                </div>

                {/* Library */}
                <div style={{ backgroundColor: '#121212', borderRadius: '8px', padding: '6px', flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px', padding: '6px 12px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📚</span><span>Your Library</span>
                    </div>
                    {playlists.map(p => (
                        <PlaylistItem key={p.id} playlist={p} selected={selectedPlaylist.id === p.id} onClick={() => setSelectedPlaylist(p)} />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#121212', overflow: 'hidden' }}>
                {/* Now playing header */}
                <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #282828', backgroundColor: '#121212' }}>
                    <span style={{ fontSize: '22px' }}>{selectedPlaylist.emoji}</span>
                    <div>
                        <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>{selectedPlaylist.name}</div>
                        <div style={{ color: '#1db954', fontSize: '11px' }}>{selectedPlaylist.category}</div>
                    </div>
                </div>
                <iframe
                    key={selectedPlaylist.id}
                    src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator&theme=0`}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    style={{ flex: 1, width: '100%', border: 'none' }}
                    title={selectedPlaylist.name}
                />
            </div>
        </div>
    )
}
