import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer" style={styles.footer}>
            <div className="container footer-grid grid grid-cols-5 gap-8" style={styles.grid}>
                <div className="footer-brand" style={styles.brandCol}>
                    <h3 style={styles.logo}>Swadeshi<span style={{ color: 'var(--color-secondary)' }}>Hub</span></h3>
                    <p style={styles.desc}>
                        Elevating Indian traditions with premium men's ethnic wear. From majestic Sherwanis to classic Kurta Pyjamas, we craft legacies of royal heritage.
                    </p>
                    <div style={styles.socials}>
                        <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
                        <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
                        <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" className="social-icon" aria-label="Youtube"><Youtube size={18} /></a>
                    </div>
                </div>

                <div className="footer-col" style={styles.linkCol}>
                    <h4 style={styles.title}>The House</h4>
                    <div className="footer-links" style={styles.links}>
                        <Link to="/about" className="footer-link">Our Heritage</Link>
                        <Link to="/contact" className="footer-link">Book Appointment</Link>
                        <Link to="/about" className="footer-link">Bespoke Tailoring</Link>
                        <Link to="/about" className="footer-link">Careers</Link>
                    </div>
                </div>

                <div className="footer-col" style={styles.linkCol}>
                    <h4 style={styles.title}>Collections</h4>
                    <div className="footer-links" style={styles.links}>
                        <Link to="/category/1" className="footer-link">The Royal Sherwanis</Link>
                        <Link to="/category/2" className="footer-link">Classic Kurta Pyjamas</Link>
                        <Link to="/category/3" className="footer-link">Woven Nehru Jackets</Link>
                        <Link to="/category/4" className="footer-link">Festive Dhoti Kurtas</Link>
                    </div>
                </div>

                <div className="footer-col" style={styles.linkCol}>
                    <h4 style={styles.title}>Client Care</h4>
                    <div className="footer-links" style={styles.links}>
                        <Link to="/login" className="footer-link">My Account</Link>
                        <a href="#" className="footer-link">Track Order</a>
                        <a href="#" className="footer-link">Shipping & Returns</a>
                        <a href="#" className="footer-link">Size Guide</a>
                    </div>
                </div>

                <div className="footer-col footer-contact" style={styles.contactCol}>
                    <h4 style={styles.title}>Contact Us</h4>
                    <div style={styles.contactInfo}>
                        <div style={styles.contactItem}><MapPin size={18} style={styles.contactIcon} /> <span>123 Heritage Street, Craft Village<br />New Delhi, 110001, India</span></div>
                        <div style={styles.contactItem}><Phone size={18} style={styles.contactIcon} /> <span>+91 98765 43210</span></div>
                        <div style={styles.contactItem}><Mail size={18} style={styles.contactIcon} /> <span>concierge@swadeshihub.in</span></div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom" style={styles.bottomBar}>
                <div className="container footer-bottom-inner" style={styles.bottomBarInner}>
                    <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Swadeshi Hub. All rights reserved.</p>
                    <div className="legal-links" style={styles.legalLinks}>
                        <a href="#" className="legal-link">Privacy Policy</a>
                        <a href="#" className="legal-link">Terms of Service</a>
                        <a href="#" className="legal-link">Cookie Policy</a>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-link {
                    color: rgba(255,255,255,0.7);
                    transition: all 0.2s ease;
                    font-size: 0.85rem;
                }
                .footer-link:hover {
                    color: var(--color-secondary) !important;
                    padding-left: 5px;
                }
                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: rgba(255,255,255,0.05);
                    color: #fff;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .social-icon:hover {
                    background-color: var(--color-secondary) !important;
                    color: white !important;
                    border-color: var(--color-secondary) !important;
                    transform: translateY(-3px);
                }
                .legal-link {
                    color: rgba(255,255,255,0.5);
                    transition: color 0.2s;
                }
                .legal-link:hover {
                    color: #fff !important;
                }
                @media (max-width: 1200px) {
                    .footer-grid { grid-template-columns: repeat(3, 1fr) !important; }
                    .footer-brand { grid-column: 1 / -1; margin-bottom: 20px; }
                }
                @media (max-width: 768px) {
                    .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .footer-contact { grid-column: 1 / -1; }
                    .footer-bottom-inner { flex-direction: column; text-align: center; gap: 15px; }
                    .legal-links { justify-content: center; }
                }
                @media (max-width: 480px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#1C1513',
        color: '#F9F6F0',
        paddingTop: '60px',
        marginTop: '60px',
        borderTop: '2px solid var(--color-secondary)'
    },
    grid: {
        paddingBottom: '50px'
    },
    brandCol: {
        paddingRight: '20px'
    },
    logo: {
        fontFamily: 'Playfair Display',
        fontSize: '1.8rem',
        color: '#FFFFFF',
        marginBottom: '15px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    desc: {
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '20px',
        fontSize: '0.85rem',
        lineHeight: 1.7
    },
    socials: {
        display: 'flex',
        gap: '12px'
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
        fontSize: '0.85rem',
        marginBottom: '20px',
        fontFamily: 'Outfit, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontWeight: '500'
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.85rem',
        lineHeight: 1.5
    },
    contactIcon: {
        color: 'var(--color-secondary)',
        marginTop: '2px',
        flexShrink: 0
    },
    bottomBar: {
        backgroundColor: '#120D0C',
        padding: '20px 0',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    bottomBarInner: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
    },
    legalLinks: {
        display: 'flex',
        gap: '20px'
    }
};
