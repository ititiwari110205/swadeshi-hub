import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, Clock, Users } from 'lucide-react';

export default function About() {
    return (
        <div>
            {/* Hero */}
            <section style={{ ...styles.hero, backgroundImage: 'url(https://image.pollinations.ai/prompt/Group%20of%20Indian%20Men%20wearing%20Kurta%20Pyjama%20festive%20diwali%20background?width=1600&height=800&nologo=true)' }}>
                <div style={styles.heroOverlay}></div>
                <div className="container" style={styles.heroContent}>
                    <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '15px' }}>House of Swadeshi</h4>
                    <h1 style={{ fontSize: '4.5rem', color: 'white', marginBottom: '20px', fontFamily: 'Playfair Display, serif', lineHeight: 1.1 }}>Our Heritage</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: '300' }}>Preserving the timeless tradition of Indian men's wear with unmatched craftsmanship and regal elegance since 1999.</p>
                </div>
            </section>

            {/* Story */}
            <section className="container" style={{ padding: '100px 20px' }}>
                <div className="grid grid-cols-2 gap-16 items-center">
                    <div>
                        <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>The Origin</h4>
                        <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: 'var(--color-primary-dark)', lineHeight: 1.2 }}>The Swadeshi Legacy</h2>
                        <div style={{ height: '2px', width: '80px', backgroundColor: 'var(--color-secondary)', marginBottom: '35px' }}></div>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '25px', lineHeight: 1.8 }}>
                            Our journey began with a singular, resolute vision: to resurrect the rich tailoring traditions of India and introduce them to the modern gentleman. For over two decades, Swadeshi Hub has stood as a bastion of elegance, crafting attire that is as majestic as it is comfortable.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '25px', lineHeight: 1.8 }}>
                            From mastering the fluid drapes of traditional Dhoti Kurtas to curating heavily embellished, royal Sherwanis fit for nobility, every garment we create tells a profound story of passion, heritage, and uncompromising quality. We source only the finest fabrics and employ generational artisans to ensure perfection in every thread.
                        </p>
                    </div>
                    <div>
                        <div style={{ position: 'relative', paddingRight: '30px', paddingBottom: '30px' }}>
                            <img src="https://image.pollinations.ai/prompt/Indian%20tailor%20crafting%20traditional%20mens%20sherwani%20golden%20embroidery?width=800&height=800&nologo=true" alt="Tailoring" style={{ borderRadius: 'var(--radius-sm)', position: 'relative', zIndex: 2, display: 'block', width: '100%' }} />
                            <div style={{ position: 'absolute', top: '30px', left: '30px', right: 0, bottom: 0, border: '2px solid var(--color-secondary)', borderRadius: 'var(--radius-sm)', zIndex: 1 }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ backgroundColor: 'var(--color-primary-dark)', padding: '100px 0', color: 'white' }}>
                <div className="container grid grid-cols-3 gap-10">
                    <div style={styles.featureBox}>
                        <Award size={40} color="var(--color-secondary)" style={{ marginBottom: '25px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'white', fontFamily: 'Playfair Display, serif' }}>Premium Materials</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>We source only the finest silks, breathable cottons, and luxurious blends directly from authentic traditional weavers across the subcontinent.</p>
                    </div>
                    <div style={styles.featureBox}>
                        <Clock size={40} color="var(--color-secondary)" style={{ marginBottom: '25px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'white', fontFamily: 'Playfair Display, serif' }}>Timeless Elegance</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>Our designs harmoniously blend classic, centuries-old motifs with cuts modernized for today's lifestyle, ensuring relevance for every grand occasion.</p>
                    </div>
                    <div style={styles.featureBox}>
                        <Users size={40} color="var(--color-secondary)" style={{ marginBottom: '25px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'white', fontFamily: 'Playfair Display, serif' }}>Master Artisans</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>Experience intricate, hand-embroidered zardozi and meticulous thread work crafted exclusively by generational artisan families.</p>
                    </div>
                </div>
            </section>

            {/* Contact Prompt */}
            <section className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Personalized Service</h4>
                <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: 'var(--color-primary-dark)' }}>Require Assistance?</h2>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto 30px' }}></div>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>Our dedicated customer support and bespoke styling experts are available to guide you in discovering your perfect royal fit and addressing any inquiries.</p>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.05rem', letterSpacing: '1px' }}>Contact the House</Link>
            </section>
        </div>
    );
}

const styles = {
    hero: {
        height: '70vh',
        minHeight: '500px',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    heroOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(58, 28, 28, 0.8))'
    },
    heroContent: {
        position: 'relative',
        zIndex: 10
    },
    featureBox: {
        padding: '0 20px',
        textAlign: 'center'
    }
};
