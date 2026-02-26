import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CategoryDetail() {
    const { id } = useParams();
    const { categories, products, addToCart } = useAppContext();

    const category = categories.find(c => c.id === parseInt(id));
    const categoryProducts = products.filter(p => p.categoryId === parseInt(id));

    if (!category) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Category Not Found</h2>
                <Link to="/categories" className="btn btn-primary">View All Collections</Link>
            </div>
        );
    }

    return (
        <div className="container category-page" style={{ padding: '40px 20px 80px', minHeight: '80vh' }}>
            {/* Breadcrumb */}
            <div className="breadcrumb sm-hide" style={{ marginBottom: '30px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                <Link to="/">Home</Link> <span style={{ margin: '0 5px' }}>/</span>
                <Link to="/categories">Collections</Link> <span style={{ margin: '0 5px' }}>/</span>
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: '600' }}> {category.name}</span>
            </div>

            <div className="category-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem', marginBottom: '15px', fontWeight: '600' }}>The Collection</h4>
                <h1 className="category-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '20px', color: 'var(--color-primary-dark)', lineHeight: 1.1 }}>{category.name}</h1>
                <div style={{ height: '3px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' }}></div>
                <p className="category-desc" style={{ color: 'var(--color-text-muted)', marginTop: '25px', fontSize: '1rem', maxWidth: '700px', margin: '25px auto', lineHeight: 1.8 }}>{category.description}</p>
            </div>

            {categoryProducts.length === 0 ? (
                <div className="empty-state" style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px dotted var(--color-border)' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '30px' }}>The curation for this collection is currently being finalized for our royal patrons.</p>
                    <Link to="/categories" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <ArrowLeft size={18} /> Explore Other Collections
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-8">
                    {categoryProducts.map(product => (
                        <div key={product.id} className="product-card hover-lift" style={styles.productCard}>
                            <Link to={`/product/${product.id}`} className="product-img-container" style={styles.productImgContainer}>
                                <img src={product.image} alt={product.name} className="product-img" style={styles.productImg} />
                                {product.stock < 10 && product.stock > 0 && <span className="badge badge-error" style={styles.badge}>Rare Find</span>}
                                {product.stock === 0 && <span className="badge" style={{ ...styles.badge, backgroundColor: 'var(--color-text-muted)' }}>Sold Out</span>}
                            </Link>
                            <div className="product-info" style={styles.productInfo}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '500' }}>{category.name}</span>
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="product-name" style={styles.productName}>{product.name}</h3>
                                </Link>
                                <div className="product-footer" style={styles.productFooter}>
                                    <span className="product-price" style={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="add-to-cart-btn"
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

            <style>{`
                .product-img-container { position: relative; display: block; padding-top: 133%; overflow: hidden; }
                .product-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .product-card:hover .product-img { transform: scale(1.1); }
                
                .add-to-cart-btn {
                    background-color: var(--color-bg);
                    color: var(--color-primary);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--color-border);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .add-to-cart-btn:hover:not(:disabled) { 
                    background-color: var(--color-primary-dark); 
                    color: white; 
                    border-color: var(--color-primary-dark); 
                    transform: translateY(-2px);
                }
                .add-to-cart-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                @media (max-width: 768px) {
                    .category-page { padding: 20px 15px 60px !important; }
                    .category-header { margin-bottom: 40px !important; }
                    .category-desc { font-size: 0.95rem !important; }
                }
            `}</style>
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
        paddingTop: '133%',
        overflow: 'hidden'
    },
    productImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
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
        fontSize: '1.05rem',
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
        fontSize: '1.2rem',
        fontWeight: '600',
        color: 'var(--color-primary-dark)'
    },
    addBtn: {
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
    }
};
