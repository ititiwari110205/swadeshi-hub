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
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            {/* Announcement Bar */}
            <div style={styles.announcementBar}>
                <div className="container" style={styles.announcementContent}>
                    <span>✧ Complimentary Shipping on Domestic Orders Above ₹10,000 ✧</span>
                    <div style={styles.announcementLinks} className="desktop-only">
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
                    <div style={styles.leftSection}>
                        <button className="mobile-menu-btn" style={styles.mobileBtn} onClick={() => setIsOpen(true)}>
                            <Menu size={24} color="var(--color-primary-dark)" />
                        </button>
                        <div style={styles.desktopLinks} className="desktop-only">
                            <Link to="/" style={styles.navLink}>Home</Link>
                            <Link to="/categories" style={styles.navLink}>Collections</Link>
                            <Link to="/about" style={styles.navLink}>Bespoke</Link>
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div style={styles.centerSection}>
                        <Link to="/" style={styles.logo}>
                            Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span>
                        </Link>
                    </div>

                    {/* Right: Icons */}
                    <div style={styles.iconContainer}>
                        <button style={styles.iconBtn} className="desktop-only">
                            <Search size={20} />
                        </button>
                        <button style={styles.iconBtn} className="desktop-only">
                            <Heart size={20} />
                        </button>
                        {user ? (
                            <div style={styles.userMenu}>
                                <Link to="/profile" style={styles.iconBtn}>
                                    <User size={20} />
                                </Link>
                                <button onClick={handleLogout} className="btn-link desktop-only" style={{ marginLeft: '10px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" style={styles.iconBtn} className="desktop-only">
                                <User size={20} />
                            </Link>
                        )}
                        <Link to="/cart" style={styles.iconBtn}>
                            <ShoppingCart size={20} />
                            {cartItemsCount > 0 && <span style={styles.cartBadge}>{cartItemsCount}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div style={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.sidebarHeader}>
                            <h2 style={{ fontFamily: 'Playfair Display', color: 'var(--color-primary-dark)', margin: 0 }}>Swadeshi Hub</h2>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--color-text)" /></button>
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
        fontSize: '0.8rem',
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
        fontSize: '0.75rem',
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
        borderBottom: '1px solid var(--color-border)',
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
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
        fontSize: '2rem',
        fontWeight: '700',
        color: 'var(--color-primary-dark)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    desktopLinks: {
        display: 'flex',
        gap: '30px',
    },
    navLink: {
        fontWeight: '500',
        fontSize: '0.85rem',
        color: 'var(--color-text)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        position: 'relative',
        padding: '5px 0',
    },
    iconContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '20px'
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
    },
    cartBadge: {
        position: 'absolute',
        top: '-6px',
        right: '-8px',
        backgroundColor: 'var(--color-secondary)',
        color: '#fff',
        borderRadius: '50%',
        width: '18px',
        height: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        fontWeight: 'bold'
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center'
    },
    mobileBtn: {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 100,
        backdropFilter: 'blur(4px)'
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '300px',
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-lg)',
        padding: '30px 24px',
        animation: 'slideIn 0.3s ease-out forwards',
        display: 'flex',
        flexDirection: 'column',
    },
    sidebarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '20px',
    },
    sidebarLinks: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    sidebarLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        fontSize: '1rem',
        fontWeight: '500',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    }
};

// Add to style tags dynamically for media query
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @media (max-width: 992px) {
      .desktop-only { display: none !important; }
      .mobile-menu-btn { display: block !important; }
      .announcementLinks { display: none !important; }
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .desktop-only a:hover, .iconBtn:hover { color: var(--color-secondary) !important; }
    .btn-link { background: none; border: none; cursor: pointer; text-decoration: underline; }
    .navLink::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--color-secondary); transition: width 0.3s ease; }
    .navLink:hover::after { width: 100%; }
  `;
    document.head.appendChild(style);
}

