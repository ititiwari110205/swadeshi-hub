import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Success() {
    const location = useLocation();
    const orderId = location.state?.orderId;
    const simulated = location.state?.simulated;

    if (!orderId) {
        return (
            <div className="container" style={{ padding: '120px 20px', textAlign: 'center', minHeight: '70vh' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Transaction State</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--color-primary-dark)' }}>No Order Found</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto 40px' }}></div>
                <Link to="/" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem', letterSpacing: '1px' }}>Return to Homepage</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '650px', width: '100%', backgroundColor: 'var(--color-surface)', padding: '60px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-premium)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', border: '1px solid var(--color-border)' }}>
                    <CheckCircle size={40} color="var(--color-secondary)" />
                </div>

                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Transaction Complete</h4>
                <h1 style={{ fontSize: '3rem', color: 'var(--color-primary-dark)', marginBottom: '20px', lineHeight: 1.1 }}>Payment Successful</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '35px', lineHeight: 1.6 }}>Thank you for your acquisition. Your order has been securely received.</p>

                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: 'var(--radius-xs)', marginBottom: '35px', border: '1px solid var(--color-border)', display: 'inline-block', width: '100%' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Order Reference</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--color-primary-dark)', fontSize: '1.4rem', fontWeight: '500', letterSpacing: '2px' }}>{orderId}</span>
                    {simulated && <p style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '15px' }}>(Simulated transaction due to test mode)</p>}
                </div>

                <p style={{ marginBottom: '45px', color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    A confirmation email will accompany your shipment details shortly.<br /><br />
                    <span style={{ color: 'var(--color-text)' }}><strong>Notice:</strong> Once your bespoke order enters tailoring or fulfillment, modifications and cancellations are respectfully declined.</span>
                </p>

                <Link to="/categories" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1rem', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    Continue Exploring <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
