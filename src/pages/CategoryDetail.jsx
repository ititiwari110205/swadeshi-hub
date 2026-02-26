import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart } from 'lucide-react';

export default function CategoryDetail() {
    const { id } = useParams();
    const { categories, products, addToCart } = useAppContext();

    const category = categories.find(c => c.id === parseInt(id));
    const categoryProducts = products.filter(p => p.categoryId === parseInt(id));

    if (!category) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Category Not Found</h2><Link to="/categories" className="btn btn-primary">View All Categories</Link></div>;
    }

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '40px', fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Link to="/">Home</Link> / <Link to="/categories">Collections</Link> /
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: '500' }}> {category.name}</span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>The Collection</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--color-primary-dark)' }}>{category.name}</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' }}></div>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '25px', fontSize: '1.1rem', maxWidth: '600px', margin: '25px auto', lineHeight: 1.8 }}>{category.description}</p>
            </div>

            {categoryProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 50px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>The curation for this collection is currently being finalized.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-6">
                    {categoryProducts.map(product => (
                        <div key={product.id} className="product-card hover-lift" style={styles.productCard}>
                            <Link to={`/product/${product.id}`} style={styles.productImgContainer}>
                                <img src={product.image} alt={product.name} className="productImg" style={styles.productImg} />
                                {product.stock < 10 && <span className="badge badge-error" style={styles.badge}>Rare Find</span>}
                            </Link>
                            <div style={styles.productInfo}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{category.name}</span>
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                </Link>
                                <div style={styles.productFooter}>
                                    <span style={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn addBtn"
                                        style={styles.addBtn}
                                        title="Acquire Piece"
                                        disabled={product.stock === 0}
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    productCard: {
        background: 'white',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
    },
    productImgContainer: {
        position: 'relative',
        display: 'block',
        paddingTop: '133%', // 3:4 aspect ratio
        overflow: 'hidden'
    },
    productImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    badge: {
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 10
    },
    productInfo: {
        padding: '24px'
    },
    productName: {
        fontSize: '1.1rem',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: '500',
        color: 'var(--color-text)',
        marginBottom: '15px',
        lineHeight: 1.4,
        height: '44px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
    },
    productFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    productPrice: {
        fontSize: '1.15rem',
        fontWeight: '600',
        color: 'var(--color-primary-dark)'
    },
    addBtn: {
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-primary)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-border)',
        transition: 'all 0.3s ease'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    .product-card:hover .productImg { transform: scale(1.08); }
    .product-card .addBtn:hover { background-color: var(--color-primary-dark); color: white; border-color: var(--color-primary-dark); }
  `;
    document.head.appendChild(style);
}
