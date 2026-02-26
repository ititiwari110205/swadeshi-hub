import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Contact() {
    const { sendMessage } = useAppContext();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 4000);
    };

    return (
        <div className="container" style={{ padding: '100px 20px', minHeight: '80vh' }}>

            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>At Your Service</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--color-primary-dark)' }}>Get in Touch</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' }}></div>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '25px', fontSize: '1.1rem', maxWidth: '650px', margin: '25px auto', lineHeight: 1.8 }}>We invite you to reach out. Whether seeking bespoke styling advice or inquiring about an exclusive order, our dedicated team is at your disposal.</p>
            </div>

            <div className="grid grid-cols-2 gap-12">

                {/* Info Box */}
                <div style={{ backgroundColor: 'var(--color-primary-dark)', padding: '60px', borderRadius: 'var(--radius-sm)', color: 'white', display: 'flex', flexDirection: 'column', gap: '50px', boxShadow: 'var(--shadow-premium)', backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(https://image.pollinations.ai/prompt/Dark%20red%20silk%20texture%20background?width=800&height=800&nologo=true)', backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
                    <div>
                        <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Direct Line</h4>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'white', fontFamily: 'Playfair Display, serif' }}>Contact Information</h3>
                        <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--color-secondary)', marginBottom: '25px' }}></div>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.7 }}>Provide your details and our concierges will attend to you within 24 hours.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '1.1rem' }}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '50%' }}>
                                <Phone size={24} color="var(--color-secondary)" />
                            </div>
                            <span style={{ fontWeight: '300', letterSpacing: '0.5px' }}>+91 98765 43210</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '1.1rem' }}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '50%' }}>
                                <Mail size={24} color="var(--color-secondary)" />
                            </div>
                            <span style={{ fontWeight: '300', letterSpacing: '0.5px' }}>concierge@swadeshihub.in</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '25px', fontSize: '1.1rem' }}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '50%' }}>
                                <MapPin size={24} color="var(--color-secondary)" />
                            </div>
                            <span style={{ lineHeight: 1.6, fontWeight: '300', letterSpacing: '0.5px' }}>123 Heritage Street, Regal Sector,<br />New Delhi, 110001</span>
                        </div>
                    </div>

                </div>

                {/* Form Box */}
                <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-premium)', border: '1px solid var(--color-border)' }}>
                    {submitted ? (
                        <div className="fade-in" style={{ textAlign: 'center', padding: '50px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', border: '1px solid var(--color-border)' }}>
                                <Send size={40} color="var(--color-secondary)" />
                            </div>
                            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '20px', fontSize: '2.5rem' }}>Message Dispatched</h2>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Thank you for reaching out. Our team has received your message and will be in correspondence shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Enter your full name"
                                    style={{ padding: '15px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="Enter your email address"
                                    style={{ padding: '15px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Mobile Number</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    placeholder="Enter your contact number"
                                    style={{ padding: '15px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '35px' }}>
                                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Your Inquiry</label>
                                <textarea
                                    className="form-input"
                                    rows="5"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    placeholder="Please detail how we may assist you..."
                                    style={{ padding: '15px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.05rem', letterSpacing: '1px' }}>Send Inquiry</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
