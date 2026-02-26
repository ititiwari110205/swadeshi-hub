import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useAppContext();
    const navigate = useNavigate();

    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '120px 20px', textAlign: 'center', minHeight: '70vh' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Your Selection</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--color-primary-dark)' }}>Cart is Empty</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto 40px' }}></div>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>You haven't added any pieces to your cart yet. Discover our curated collections and extraordinary craftsmanship.</p>
                    <Link to="/categories" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem', letterSpacing: '1px' }}>Explore Collections</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            <div style={{ marginBottom: '50px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '10px' }}>Your Selection</h4>
                <h1 style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--color-primary-dark)' }}>Shopping Cart</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)' }}></div>
            </div>

            <div className="grid grid-cols-3 gap-10">
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>

                        {/* Table Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1fr 1fr', padding: '15px 0', borderBottom: '1px solid var(--color-border)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '2px' }}>
                            <div>Piece</div>
                            <div style={{ textAlign: 'center' }}>Price</div>
                            <div style={{ textAlign: 'center' }}>Qty</div>
                            <div style={{ textAlign: 'right' }}>Total</div>
                        </div>

                        {/* Cart Items */}
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1fr 1fr', alignItems: 'center', padding: '30px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                                    <div style={{ width: '100px', height: '133px', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-light)', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>Men's Wear</span>
                                        <Link to={`/product/${item.id}`} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', fontFamily: 'Outfit, sans-serif' }}>{item.name}</h3>
                                        </Link>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '15px', transition: 'color 0.2s', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-error)'}
                                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', color: 'var(--color-text)', fontSize: '1.05rem' }}>
                                    ₹{item.price.toLocaleString('en-IN')}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', opacity: item.quantity <= 1 ? 0.3 : 1 }} disabled={item.quantity <= 1}><Minus size={14} /></button>
                                        <span style={{ padding: '0 5px', fontWeight: '500', width: '30px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', fontWeight: '500', color: 'var(--color-primary-dark)', fontSize: '1.1rem' }}>
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div>
                    <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', borderBottom: '1px solid var(--color-border)', paddingBottom: '15px', fontWeight: '500' }}>Order Summary</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                            <span>Shipping</span>
                            <span>Complimentary</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 25px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--color-primary-dark)' }}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                        >
                            Secure Checkout <ArrowRight size={18} />
                        </button>

                        <div style={{ marginTop: '25px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                            <ShieldCheck size={16} color="var(--color-secondary)" />
                            Secure & Encrypted Payment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
