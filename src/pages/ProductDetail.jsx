import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail() {
    const { id } = useParams();
    const { products, categories, addToCart } = useAppContext();
    const [added, setAdded] = useState(false);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Product Not Found</h2><Link to="/categories" className="btn btn-primary">Back to Shop</Link></div>;
    }

    const category = categories.find(c => c.id === product.categoryId);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="container" style={{ padding: '80px 20px' }}>

            {/* Breadcrumb */}
            <div style={{ marginBottom: '40px', fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Link to="/">Home</Link> / <Link to="/categories">Collections</Link> /
                <Link to={`/category/${category?.id}`}> {category?.name}</Link> /
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: '500' }}> {product.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-8 items-start align-start" style={{ alignItems: 'start' }}>

                {/* Gallery */}
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', display: 'block' }} />
                </div>

                {/* Info */}
                <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-secondary-dark)', fontSize: '0.8rem', fontWeight: '500', marginBottom: '15px' }}>{category?.name}</span>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: 1.1 }}>{product.name}</h1>

                    <div style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', fontWeight: '500', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid var(--color-border)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '35px', lineHeight: 1.8 }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '35px' }}>
                        <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', color: 'var(--color-primary-dark)', fontWeight: '500' }}>The Details</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {product.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--color-text)', fontSize: '0.95rem' }}>
                                    <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-secondary)', borderRadius: '50%' }}></div> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ marginBottom: '35px' }}>
                        <span style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: product.stock > 0 ? 'var(--color-text)' : 'var(--color-error)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {product.stock > 0 ? `Limited Availability (${product.stock} left)` : 'Currently Unavailable'}
                        </span>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={handleAdd}
                            disabled={product.stock === 0}
                        >
                            {added ? <><Check size={20} style={{ marginRight: '10px' }} /> Added to Collection</> : <><ShoppingCart size={20} style={{ marginRight: '10px' }} /> Acquire Piece</>}
                        </button>

                        <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <ShieldCheck size={24} color="var(--color-secondary)" style={{ margin: '0 auto 8px' }} />
                                <p>Authentic Craft</p>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <Truck size={24} color="var(--color-secondary)" style={{ margin: '0 auto 8px' }} />
                                <p>Complimentary Shipping</p>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <RotateCcw size={24} color="var(--color-secondary)" style={{ margin: '0 auto 8px' }} />
                                <p>Bespoke Returns</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
