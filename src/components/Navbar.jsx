import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, ChevronRight, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart, user, logout } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        if (isOpen) {
            document.body.style.overflow = 'auto';
        }
    }, [location]);

    const toggleSidebar = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);
        document.body.style.overflow = nextState ? 'hidden' : 'auto';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar" style={styles.announcementBar}>
                <div className="container announcement-content" style={styles.announcementContent}>
                    <span className="announcement-text">✧ Complimentary Shipping on Domestic Orders Above ₹10,000 ✧</span>
                    <div className="announcement-links desktop-only" style={styles.announcementLinks}>
                        <Link to="/contact">Book an Appointment</Link>
                        <span>|</span>
                        <Link to="/about">Our Heritage</Link>
                        {user?.role === 'admin' && (
                            <>
                                <span>|</span>
                                <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer">Admin Portal</a>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>
                <div className="container" style={styles.navContainer}>
                    {/* Left: Mobile Menu & Desktop Links */}
                    <div className="nav-left" style={styles.leftSection}>
                        <button className="mobile-only" style={styles.mobileBtn} onClick={toggleSidebar} aria-label="Open Menu">
                            <Menu size={24} color="var(--color-primary-dark)" />
                        </button>
                        <div className="desktop-only" style={styles.desktopLinks}>
                            <Link to="/" className="nav-link-underline" style={styles.navLink}>Home</Link>
                            <Link to="/categories" className="nav-link-underline" style={styles.navLink}>Collections</Link>
                            <Link to="/about" className="nav-link-underline" style={styles.navLink}>Bespoke</Link>
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className="nav-center" style={styles.centerSection}>
                        <Link to="/" style={styles.logo}>
                            Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span>
                        </Link>
                    </div>

                    {/* Right: Icons */}
                    <div className="nav-right" style={styles.iconContainer}>
                        <button style={styles.iconBtn} className="desktop-only icon-hover">
                            <Search size={20} />
                        </button>
                        <button style={styles.iconBtn} className="desktop-only icon-hover">
                            <Heart size={20} />
                        </button>
                        {user ? (
                            <div style={styles.userMenu}>
                                <Link to="/profile" style={styles.iconBtn} className="icon-hover">
                                    <User size={20} />
                                </Link>
                                <button onClick={handleLogout} className="desktop-only" style={styles.logoutBtn}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" style={styles.iconBtn} className="desktop-only icon-hover">
                                <User size={20} />
                            </Link>
                        )}
                        <Link to="/cart" style={styles.iconBtn} className="icon-hover">
                            <ShoppingCart size={20} />
                            {cartItemsCount > 0 && <span style={styles.cartBadge}>{cartItemsCount}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="overlay fade-in" style={styles.overlay} onClick={toggleSidebar}>
                    <div className="sidebar sidebar-animated" style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.sidebarHeader}>
                            <h2 style={{ fontFamily: 'Playfair Display', color: 'var(--color-primary-dark)', margin: 0, fontSize: '1.5rem' }}>Swadeshi Hub</h2>
                            <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--color-text)" /></button>
                        </div>
                        <div style={styles.sidebarLinks}>
                            <Link to="/" style={styles.sidebarLink}>Home <ChevronRight size={16} /></Link>
                            <Link to="/categories" style={styles.sidebarLink}>Shop Collections <ChevronRight size={16} /></Link>
                            <Link to="/about" style={styles.sidebarLink}>Our Heritage <ChevronRight size={16} /></Link>
                            <Link to="/contact" style={styles.sidebarLink}>Book Appointment <ChevronRight size={16} /></Link>
                            {!user && <Link to="/login" style={styles.sidebarLink}>Login / Register <ChevronRight size={16} /></Link>}
                            {user?.role === 'admin' && (
                                <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer" style={{ ...styles.sidebarLink, color: 'var(--color-secondary)' }}>Admin Portal <ChevronRight size={16} /></a>
                            )}
                        </div>
                        {user && (
                            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                                <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    announcementBar: {
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--color-secondary-light)',
        padding: '8px 0',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    announcementContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'center',
    },
    announcementLinks: {
        position: 'absolute',
        right: '20px',
        display: 'flex',
        gap: '15px',
        color: 'var(--color-bg)',
        fontSize: '0.7rem',
    },
    navbar: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid transparent',
        transition: 'all 0.3s ease',
    },
    navbarScrolled: {
        boxShadow: 'var(--shadow-sm)',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderBottom: '1px solid var(--color-border)',
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
    },
    leftSection: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    centerSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    logo: {
        fontFamily: 'Playfair Display',
        fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
        fontWeight: '700',
        color: 'var(--color-primary-dark)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    desktopLinks: {
        display: 'flex',
        gap: '24px',
    },
    navLink: {
        fontWeight: '500',
        fontSize: '0.8rem',
        color: 'var(--color-text)',
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        position: 'relative',
        padding: '5px 0',
    },
    iconContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'clamp(10px, 3vw, 20px)'
    },
    iconBtn: {
        position: 'relative',
        color: 'var(--color-primary-dark)',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        padding: '5px'
    },
    cartBadge: {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        backgroundColor: 'var(--color-secondary)',
        color: '#fff',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.65rem',
        fontWeight: 'bold'
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center'
    },
    mobileBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        marginRight: '10px'
    },
    logoutBtn: {
        marginLeft: '10px',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100,
        backdropFilter: 'blur(3px)'
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'min(300px, 85vw)',
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
    },
    sidebarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '15px',
    },
    sidebarLinks: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    sidebarLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        fontSize: '0.9rem',
        fontWeight: '500',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    }
};

