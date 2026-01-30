import { useState, useEffect } from 'react'
import { userAPI } from '../services/userAPI'
import { contentAPI } from '../services/contentAPI'
import { saveUserData } from '../services/authAPI'
import ContentCard from '../components/ContentCard' // Assuming this exists or I'll stub it
import './MySpace.css'

const subscriptionPlans = [
    {
        id: 'Basic',
        name: 'Basic',
        durationMonths: 1,
        duration: '1 Month',
        price: '₹199',
        features: ['1080p Resolution', '1 Device', 'Mobile Only', 'Ad-Supported']
    },
    {
        id: 'Standard',
        name: 'Standard',
        durationMonths: 3,
        duration: '3 Months',
        price: '₹499',
        originalPrice: '₹597',
        features: ['Full HD 1080p', '2 Devices', 'All Platforms', 'Ad-Free', 'Save 17%'],
        popular: true
    },
    {
        id: 'Premium',
        name: 'Premium',
        durationMonths: 6,
        duration: '6 Months',
        price: '₹899',
        originalPrice: '₹1194',
        features: ['4K Ultra HD', '4 Devices', 'All Platforms', 'Ad-Free', 'Download Content', 'Save 25%'],
        recommended: true
    },
    {
        id: 'Ultimate',
        name: 'Ultimate',
        durationMonths: 12,
        duration: '1 Year',
        price: '₹1599',
        originalPrice: '₹2388',
        features: ['4K Ultra HD + HDR', 'Unlimited Devices', 'All Platforms', 'Ad-Free', 'Download Unlimited', 'Priority Support', 'Save 33%'],
        best: true
    }
]

// Stub ContentCard if not imported correctly in context (I know it is in components)
// import ContentCard from '../components/ContentCard'

function MySpace({ user, onClose, initialTab = 'overview' }) {
    const [activeTab, setActiveTab] = useState(initialTab)
    const [myList, setMyList] = useState([])
    const [favorites, setFavorites] = useState([])

    // Edit Profile State
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({
        email: user.email || '',
        currentPassword: '',
        newPassword: ''
    })
    const [editMessage, setEditMessage] = useState('')

    // Fetch Lists on Load
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const content = await contentAPI.getUserContent()
                setMyList(content.filter(item => item.inWatchlist).map(item => ({
                    id: item.contentId,
                    title: item.title,
                    poster_path: item.posterPath,
                    media_type: item.contentType
                })))
                setFavorites(content.filter(item => item.liked).map(item => ({
                    id: item.contentId,
                    title: item.title,
                    poster_path: item.posterPath,
                    media_type: item.contentType
                })))
            } catch (error) {
                console.error("Failed to fetch content", error)
            }
        }
        if (activeTab === 'mylist' || activeTab === 'favorites') {
            fetchContent()
        }
    }, [activeTab])

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        setEditMessage('')
        try {
            const updatedUser = await userAPI.updateProfile(user.username, editForm)
            saveUserData(updatedUser)
            setEditMessage('✅ Profile updated successfully! Please refresh.')
            setTimeout(() => {
                setIsEditing(false)
                window.location.reload() // Reload to reflect changes globally
            }, 1000)
        } catch (error) {
            setEditMessage('❌ ' + error.message)
        }
    }

    const handleSubscribe = async (plan) => {
        if (!confirm(`Confirm subscription to ${plan.name} for ${plan.price}?`)) return
        try {
            const updatedUser = await userAPI.subscribe(user.username, plan.id, plan.durationMonths)
            saveUserData(updatedUser)
            alert(`🎉 Subscribed to ${plan.name} successfully!`)
            window.location.reload()
        } catch (error) {
            alert('Subscription failed: ' + error.message)
        }
    }

    const handleRemoveFromList = async (e, item) => {
        e.stopPropagation()
        if (!confirm(`Remove "${item.title}" from your list?`)) return
        try {
            await contentAPI.toggleWatchlist(item, false)
            setMyList(prev => prev.filter(i => i.id !== item.id))
        } catch (error) {
            console.error("Failed to remove from list", error)
        }
    }

    const handleRemoveFromFavorites = async (e, item) => {
        e.stopPropagation()
        if (!confirm(`Remove "${item.title}" from favorites?`)) return
        try {
            await contentAPI.toggleLike(item, false)
            setFavorites(prev => prev.filter(i => i.id !== item.id))
        } catch (error) {
            console.error("Failed to remove from favorites", error)
        }
    }

    return (
        <div className="myspace-overlay">
            <div className="myspace-container">
                {/* Header */}
                <div className="myspace-header">
                    <div className="header-left">
                        <h1>My Space</h1>
                        <p>Manage your NewFlix experience</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Tabs */}
                <div className="myspace-tabs">
                    <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Overview</button>
                    <button className={`tab ${activeTab === 'subscription' ? 'active' : ''}`} onClick={() => setActiveTab('subscription')}>💳 Subscription</button>
                    <button className={`tab ${activeTab === 'mylist' ? 'active' : ''}`} onClick={() => setActiveTab('mylist')}>📝 My List</button>
                    <button className={`tab ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveTab('favorites')}>❤️ Favorites</button>
                    <button className={`tab ${activeTab === 'help' ? 'active' : ''}`} onClick={() => setActiveTab('help')}>❓ Help</button>
                </div>

                {/* Content */}
                <div className="myspace-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-content overview-tab">
                            {isEditing ? (
                                <div className="edit-profile-form">
                                    <h3>Edit Profile</h3>
                                    <form onSubmit={handleEditSubmit}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={editForm.email}
                                                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Current Password (Required)</label>
                                            <input
                                                type="password"
                                                required
                                                value={editForm.currentPassword}
                                                onChange={e => setEditForm({ ...editForm, currentPassword: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password (Optional)</label>
                                            <input
                                                type="password"
                                                value={editForm.newPassword}
                                                onChange={e => setEditForm({ ...editForm, newPassword: e.target.value })}
                                            />
                                        </div>
                                        {editMessage && <p className="msg">{editMessage}</p>}
                                        <div className="form-actions">
                                            <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                            <button type="submit" className="btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="info-cards">
                                    <div className="info-card">
                                        <div className="card-icon">👤</div>
                                        <div className="card-content">
                                            <h3>Account</h3>
                                            <p><strong>Username:</strong> {user.username}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <button className="btn-small" onClick={() => setIsEditing(true)}>Edit Details</button>
                                        </div>
                                    </div>

                                    <div className="info-card highlight">
                                        <div className="card-icon">💎</div>
                                        <div className="card-content">
                                            <h3>Subscription</h3>
                                            <p className="plan-name">{user.subscriptionStatus === 'ACTIVE' ? user.subscriptionPlan : 'No Active Plan'}</p>
                                            {user.subscriptionStatus === 'ACTIVE' && (
                                                <p className="plan-expiry">Expires: {new Date(user.subscriptionEndDate).toLocaleDateString()}</p>
                                            )}
                                            <button className="btn-small btn-primary" onClick={() => setActiveTab('subscription')}>
                                                {user.subscriptionStatus === 'ACTIVE' ? 'Change Plan' : 'Subscribe Now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Subscription Tab */}
                    {activeTab === 'subscription' && (
                        <div className="tab-content subscription-tab">
                            <h2>Choose Your Plan</h2>
                            <div className="subscription-grid">
                                {subscriptionPlans.map(plan => (
                                    <div key={plan.id} className={`subscription-card ${plan.popular ? 'popular' : ''} ${plan.id === user.subscriptionPlan ? 'current-plan' : ''}`}>
                                        <h3>{plan.name}</h3>
                                        <div className="price">{plan.price} <span className="duration">/ {plan.duration}</span></div>
                                        <ul className="features-list">
                                            {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                                        </ul>
                                        {user.subscriptionPlan === plan.id && user.subscriptionStatus === 'ACTIVE' ? (
                                            <button className="subscribe-btn current" disabled>Current Plan</button>
                                        ) : (
                                            <button className="subscribe-btn" onClick={() => handleSubscribe(plan)}>Subscribe</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* My List Tab */}
                    {activeTab === 'mylist' && (
                        <div className="tab-content list-tab">
                            <h2>📝 My Watchlist</h2>
                            <div className="content-grid">
                                {myList.length > 0 ? myList.map(item => (
                                    <div key={item.id} className="mini-card">
                                        <button
                                            className="remove-btn-overlay"
                                            onClick={(e) => handleRemoveFromList(e, item)}
                                            title="Remove from list"
                                        >
                                            ✕
                                        </button>
                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                        <p>{item.title}</p>
                                    </div>
                                )) : <p>Your watchlist is empty.</p>}
                            </div>
                        </div>
                    )}

                    {/* Favorites Tab */}
                    {activeTab === 'favorites' && (
                        <div className="tab-content list-tab">
                            <h2>❤️ Favorites</h2>
                            <div className="content-grid">
                                {favorites.length > 0 ? favorites.map(item => (
                                    <div key={item.id} className="mini-card">
                                        <button
                                            className="remove-btn-overlay"
                                            onClick={(e) => handleRemoveFromFavorites(e, item)}
                                            title="Remove from favorites"
                                        >
                                            ✕
                                        </button>
                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                        <p>{item.title}</p>
                                    </div>
                                )) : <p>No favorites yet.</p>}
                            </div>
                        </div>
                    )}

                    {/* Help Tab */}
                    {activeTab === 'help' && (
                        <div className="tab-content help-tab">
                            <h2>❓ Help Centre</h2>
                            <p>Contact us at support@newflix.com</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MySpace
