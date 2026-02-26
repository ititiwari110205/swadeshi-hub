import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.grid}>
                <div style={styles.brandCol}>
                    <h3 style={styles.logo}>Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span></h3>
                    <p style={styles.desc}>
                        Elevating Indian traditions with premium men's ethnic wear. From majestic Sherwanis to classic Kurta Pyjamas, we craft legacies of royal heritage.
                    </p>
                    <div style={styles.socials}>
                        <a href="#" style={styles.icon} aria-label="Instagram"><Instagram size={18} /></a>
                        <a href="#" style={styles.icon} aria-label="Facebook"><Facebook size={18} /></a>
                        <a href="#" style={styles.icon} aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" style={styles.icon} aria-label="Youtube"><Youtube size={18} /></a>
                    </div>
                </div>

                <div style={styles.linkCol}>
                    <h4 style={styles.title}>The House</h4>
                    <div style={styles.links}>
                        <Link to="/about" style={styles.link}>Our Heritage</Link>
                        <Link to="/contact" style={styles.link}>Book Appointment</Link>
                        <Link to="/about" style={styles.link}>Bespoke Tailoring</Link>
                        <Link to="/about" style={styles.link}>Careers</Link>
                    </div>
                </div>

                <div style={styles.linkCol}>
                    <h4 style={styles.title}>Collections</h4>
                    <div style={styles.links}>
                        <Link to="/category/1" style={styles.link}>The Royal Sherwanis</Link>
                        <Link to="/category/2" style={styles.link}>Classic Kurta Pyjamas</Link>
                        <Link to="/category/3" style={styles.link}>Woven Nehru Jackets</Link>
                        <Link to="/category/4" style={styles.link}>Festive Dhoti Kurtas</Link>
                    </div>
                </div>

                <div style={styles.linkCol}>
                    <h4 style={styles.title}>Client Care</h4>
                    <div style={styles.links}>
                        <Link to="/login" style={styles.link}>My Account</Link>
                        <a href="#" style={styles.link}>Track Order</a>
                        <a href="#" style={styles.link}>Shipping & Returns</a>
                        <a href="#" style={styles.link}>Size Guide</a>
                    </div>
                </div>

                <div style={styles.contactCol}>
                    <h4 style={styles.title}>Contact Us</h4>
                    <div style={styles.contactInfo}>
                        <div style={styles.contactItem}><MapPin size={18} style={styles.contactIcon} /> <span>123 Heritage Street, Craft Village<br />New Delhi, 110001, India</span></div>
                        <div style={styles.contactItem}><Phone size={18} style={styles.contactIcon} /> <span>+91 98765 43210</span></div>
                        <div style={styles.contactItem}><Mail size={18} style={styles.contactIcon} /> <span>concierge@swadeshihub.in</span></div>
                    </div>
                </div>
            </div>

            <div style={styles.bottomBar}>
                <div className="container" style={styles.bottomBarInner}>
                    <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Swadeshi Hub. All rights reserved.</p>
                    <div style={styles.legalLinks}>
                        <a href="#" style={styles.legalLink}>Privacy Policy</a>
                        <a href="#" style={styles.legalLink}>Terms of Service</a>
                        <a href="#" style={styles.legalLink}>Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#1C1513', // Deep rich brown almost black
        color: '#F9F6F0',
        paddingTop: '80px',
        marginTop: '60px',
        borderTop: '2px solid var(--color-secondary)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
        gap: '40px',
        paddingBottom: '60px'
    },
    brandCol: {
        paddingRight: '20px'
    },
    logo: {
        fontFamily: 'Playfair Display',
        fontSize: '2rem',
        color: '#FFFFFF',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    desc: {
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '25px',
        fontSize: '0.9rem',
        lineHeight: 1.8
    },
    socials: {
        display: 'flex',
        gap: '12px'
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'var(--color-bg)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    linkCol: {
        display: 'flex',
        flexDirection: 'column'
    },
    contactCol: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        color: 'var(--color-secondary)',
        fontSize: '0.9rem',
        marginBottom: '25px',
        fontFamily: 'Outfit, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontWeight: '500'
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    link: {
        color: 'rgba(255,255,255,0.7)',
        transition: 'color 0.2s, padding 0.2s',
        fontSize: '0.85rem'
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.85rem',
        lineHeight: 1.6
    },
    contactIcon: {
        color: 'var(--color-secondary)',
        marginTop: '2px',
        flexShrink: 0
    },
    bottomBar: {
        backgroundColor: '#120D0C',
        padding: '20px 0',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    bottomBarInner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
    },
    legalLinks: {
        display: 'flex',
        gap: '20px'
    },
    legalLink: {
        color: 'rgba(255,255,255,0.5)'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    footer .link:hover { color: var(--color-secondary) !important; padding-left: 5px; }
    footer .icon:hover { background-color: var(--color-secondary) !important; color: white !important; border-color: var(--color-secondary) !important; }
    footer .legalLink:hover { color: white !important; }
    @media (max-width: 992px) {
      footer .grid { grid-template-columns: repeat(3, 1fr); gap: 40px 20px; }
      .brandCol { grid-column: 1 / -1; }
    }
    @media (max-width: 768px) {
      footer .grid { grid-template-columns: 1fr; gap: 40px; }
      footer .bottomBarInner { flex-direction: column; text-align: center; }
    }
  `;
    document.head.appendChild(style);
}
