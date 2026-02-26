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
        return <div className="container select-none" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Product Not Found</h2><Link to="/categories" className="btn btn-primary">Back to Shop</Link></div>;
    }

    const category = categories.find(c => c.id === product.categoryId);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="container product-detail-container" style={{ padding: '40px 20px 80px' }}>

            {/* Breadcrumb */}
            <div className="breadcrumb sm-hide" style={{ marginBottom: '30px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Link to="/">Home</Link> <span style={{ margin: '0 5px' }}>/</span>
                <Link to="/categories">Collections</Link> <span style={{ margin: '0 5px' }}>/</span>
                <Link to={`/category/${category?.id}`}> {category?.name}</Link> <span style={{ margin: '0 5px' }}>/</span>
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: '500' }}> {product.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-12 sm-grid-cols-1 items-start">
                {/* Gallery */}
                <div className="product-gallery" style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div className="product-info-section" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="product-label" style={{ textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-secondary-dark)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '10px' }}>{category?.name}</span>
                    <h1 className="product-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '15px', lineHeight: 1.1 }}>{product.name}</h1>

                    <div className="product-price-tag" style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', fontWeight: '600', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    <p className="product-description" style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '30px', lineHeight: 1.8 }}>
                        {product.description}
                    </p>

                    <div className="product-specs" style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', color: 'var(--color-primary-dark)', fontWeight: '600' }}>The Details</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {product.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                                    <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-secondary)', borderRadius: '50%', flexShrink: 0 }}></div> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-stock-status" style={{ marginBottom: '30px' }}>
                        <span style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: 'rgba(197, 160, 89, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: product.stock > 0 ? 'var(--color-text)' : 'var(--color-error)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}>
                            {product.stock > 0 ? `Limited Availability (${product.stock} left)` : 'Currently Unavailable'}
                        </span>
                    </div>

                    <div className="product-actions" style={{ marginTop: 'auto' }}>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                            onClick={handleAdd}
                            disabled={product.stock === 0}
                        >
                            {added ? <><Check size={20} /> Added to Collection</> : <><ShoppingCart size={20} /> Acquire Piece</>}
                        </button>

                        <div className="product-trust-badges" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            <div style={{ textAlign: 'center', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <ShieldCheck size={20} color="var(--color-secondary)" style={{ margin: '0 auto 6px' }} />
                                <p>Authentic Craft</p>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <Truck size={20} color="var(--color-secondary)" style={{ margin: '0 auto 6px' }} />
                                <p>Complimentary Shipping</p>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                                <RotateCcw size={20} color="var(--color-secondary)" style={{ margin: '0 auto 6px' }} />
                                <p>Bespoke Returns</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .product-detail-container { padding: 20px 15px 60px !important; }
                    .product-gallery { margin-bottom: 20px; }
                    .product-info-section { text-align: center; }
                    .product-specs ul { display: inline-block; text-align: left; }
                    .product-trust-badges { gap: 5px !important; }
                    .product-trust-badges p { font-size: 0.6rem; }
                }
            `}</style>
        </div>
    );
}
