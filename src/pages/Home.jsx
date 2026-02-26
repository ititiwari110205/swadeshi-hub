import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, ShoppingCart, Scissors, ShieldCheck, Ruler, Truck } from 'lucide-react';

export default function Home() {
    const { slides, products, categories, addToCart } = useAppContext();
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    const newArrivals = products.slice(0, 4); // Just mock new arrivals

    return (
        <div>
            {/* Hero Slider */}
            <section className="hero-slider" style={{ position: 'relative' }}>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, EffectFade]}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    style={{ height: '85vh', minHeight: '600px' }}
                >
                    {slides.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <div style={styles.slide}>
                                <div style={{ ...styles.slideBg, backgroundImage: `url(${slide.image})` }} />
                                <div style={styles.slideOverlay} />
                                <div style={styles.slideContent} className="container fade-in">
                                    <span style={styles.slideKicker}>New Collection</span>
                                    <h1 style={styles.slideTitle}>{slide.title}</h1>
                                    <p style={styles.slideSubtitle}>{slide.subtitle}</p>
                                    <Link to="/categories" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '0.9rem', marginTop: '30px' }}>
                                        Explore Collection
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Features/Trust Bar */}
            <section style={styles.trustBar}>
                <div className="container grid grid-cols-4 gap-4" style={{ textAlign: 'center' }}>
                    <div style={styles.trustItem}>
                        <Scissors size={28} color="var(--color-secondary)" />
                        <h4 style={styles.trustTitle}>Bespoke Tailoring</h4>
                        <p style={styles.trustDesc}>Custom fit to your exact measurements</p>
                    </div>
                    <div style={styles.trustItem}>
                        <ShieldCheck size={28} color="var(--color-secondary)" />
                        <h4 style={styles.trustTitle}>Premium Fabrics</h4>
                        <p style={styles.trustDesc}>Ethically sourced silks and cottons</p>
                    </div>
                    <div style={styles.trustItem}>
                        <Truck size={28} color="var(--color-secondary)" />
                        <h4 style={styles.trustTitle}>Global Shipping</h4>
                        <p style={styles.trustDesc}>Worldwide secure delivery directly to you</p>
                    </div>
                    <div style={styles.trustItem}>
                        <Ruler size={28} color="var(--color-secondary)" />
                        <h4 style={styles.trustTitle}>Perfect Fit Guarantee</h4>
                        <p style={styles.trustDesc}>Complimentary alterations on request</p>
                    </div>
                </div>
            </section>

            {/* Categories - Magazine Style */}
            <section style={{ ...styles.section, backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Curated Collections</h2>
                        <div style={styles.divider}></div>
                    </div>
                    <div className="grid grid-cols-4 gap-6" style={{ marginTop: '40px' }}>
                        {categories.slice(0, 4).map((cat, index) => (
                            <Link to={`/category/${cat.id}`} key={cat.id} className="category-card hover-lift" style={{ ...styles.categoryCard, height: index % 2 === 0 ? '450px' : '400px', alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                                <div style={styles.catOverlay} />
                                <div style={styles.catContent}>
                                    <h3 style={styles.catTitle}>{cat.name}</h3>
                                    <span style={styles.catLink}>Discover <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={styles.section} className="container">
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>The Royal Edit</h2>
                    <div style={styles.divider}></div>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '15px', maxWidth: '600px', margin: '15px auto 0' }}>Discover our most sought-after pieces, crafted with extraordinary attention to detail for your special occasions.</p>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="product-card hover-lift" style={styles.productCard}>
                            <Link to={`/product/${product.id}`} style={styles.productImgContainer}>
                                <img src={product.image} alt={product.name} className="productImg" style={styles.productImg} />
                                {product.stock < 10 && <span className="badge badge-error" style={styles.badge}>Rare Find</span>}
                            </Link>
                            <div style={styles.productInfo}>
                                <div style={styles.productMeta}>
                                    <span style={styles.productCat}>{categories.find(c => c.id === product.categoryId)?.name}</span>
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
                                        title="Add to Cart"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Link to="/categories" className="btn btn-outline">
                        View Complete Collection
                    </Link>
                </div>
            </section>

            {/* Bespoke Highlights */}
            <section style={styles.highlightSection}>
                <div className="container grid grid-cols-2 gap-8 items-center">
                    <div style={{ paddingRight: '40px' }}>
                        <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Our Heritage</h4>
                        <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: 'var(--color-surface)', lineHeight: 1.1 }}>The Art of Zardozi<br /><span style={{ fontStyle: 'italic', fontWeight: '400', color: 'var(--color-secondary-light)' }}>& Master Craftsmanship</span></h2>
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '30px', lineHeight: 1.8 }}>
                            At Swadeshi Hub, every garment tells a story. We employ generational artisans who preserve the dying arts of hand-embroidery. From majestic Sherwanis to everyday classic Kurta Pyjamas, experience the royal heritage tailored precisely to your form.
                        </p>
                        <Link to="/about" className="btn btn-secondary">Discover The Process</Link>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img src="https://image.pollinations.ai/prompt/Indian%20tailor%20crafting%20traditional%20mens%20sherwani%20golden%20embroidery?width=800&height=600&nologo=true" alt="Craftsmanship" style={{ borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-premium)' }} />
                        <div style={styles.experienceBadge}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>30</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Years of<br />Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section style={styles.newsletterSection}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Join The Inner Circle</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>Subscribe to receive early access to new collections, exclusive bespoke events, and styling advice.</p>
                    <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email address" style={styles.newsletterInput} required />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0 40px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

const styles = {
    slide: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    slideBg: {
        position: 'absolute',
        inset: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%', // focal point adjust
        backgroundRepeat: 'no-repeat',
    },
    slideOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(20, 5, 5, 0.7) 0%, rgba(20, 5, 5, 0.2) 100%)',
    },
    slideContent: {
        position: 'relative',
        zIndex: 10,
        color: 'white',
        maxWidth: '700px',
    },
    slideKicker: {
        display: 'inline-block',
        color: 'var(--color-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        fontSize: '0.8rem',
        marginBottom: '10px',
        fontWeight: '600'
    },
    slideTitle: {
        fontFamily: 'Playfair Display',
        fontSize: '5rem',
        fontWeight: '600',
        color: 'white',
        lineHeight: 1.1,
        marginBottom: '15px',
    },
    slideSubtitle: {
        fontSize: '1.2rem',
        fontWeight: '300',
        marginBottom: '0',
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.6,
        maxWidth: '500px'
    },
    trustBar: {
        backgroundColor: 'var(--color-surface)',
        padding: '50px 0',
        borderBottom: '1px solid var(--color-border)',
    },
    trustItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
    },
    trustTitle: {
        fontSize: '1.1rem',
        margin: 0,
        color: 'var(--color-text)',
    },
    trustDesc: {
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        margin: 0
    },
    section: {
        padding: '100px 0',
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionTitle: {
        fontSize: '2.8rem',
        fontWeight: '500',
        marginBottom: '15px'
    },
    divider: {
        height: '2px',
        width: '60px',
        backgroundColor: 'var(--color-secondary)',
        margin: '0 auto'
    },
    categoryCard: {
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'var(--color-primary-dark)'
    },
    catOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
        transition: 'background 0.4s ease'
    },
    catContent: {
        position: 'relative',
        zIndex: 10,
        padding: '30px',
        width: '100%'
    },
    catTitle: {
        color: 'white',
        fontSize: '1.8rem',
        margin: 0,
        marginBottom: '8px',
        fontWeight: '500'
    },
    catLink: {
        color: 'var(--color-secondary)',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
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
    productMeta: {
        marginBottom: '8px'
    },
    productCat: {
        color: 'var(--color-text-light)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
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
        alignItems: 'center',
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
    },
    highlightSection: {
        padding: '120px 0',
        backgroundColor: 'var(--color-primary-dark)',
        color: 'white',
    },
    experienceBadge: {
        position: 'absolute',
        bottom: '-25px',
        left: '-25px',
        backgroundColor: 'var(--color-secondary)',
        padding: '25px',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-premium)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        zIndex: 10
    },
    newsletterSection: {
        padding: '100px 0',
        backgroundColor: 'var(--color-bg)',
    },
    newsletterForm: {
        display: 'flex',
        height: '56px',
        boxShadow: 'var(--shadow-md)',
        borderRadius: 'var(--radius-sm)'
    },
    newsletterInput: {
        flex: 1,
        padding: '0 24px',
        border: '1px solid var(--color-border)',
        borderRight: 'none',
        borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
        fontSize: '1rem',
        outline: 'none',
        fontFamily: 'inherit'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    .category-card:nth-child(1) { background-image: url('https://image.pollinations.ai/prompt/Indian%20Men%20wearing%20Kurta%20Pyjama%20festive%20background%20highly%20detailed?width=600&height=800&nologo=true'); }
    .category-card:nth-child(2) { background-image: url('https://image.pollinations.ai/prompt/Indian%20Groom%20Royal%20Sherwani%20wedding%20background?width=600&height=800&nologo=true'); }
    .category-card:nth-child(3) { background-image: url('https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Nehru%20Jacket%20over%20kurta%20elegant%20pose?width=600&height=800&nologo=true'); }
    .category-card:nth-child(4) { background-image: url('https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Dhoti%20Kurta%20traditional%20puja%20background?width=600&height=800&nologo=true'); }
    .product-card:hover .productImg { transform: scale(1.08); }
    .product-card .addBtn:hover { background-color: var(--color-primary-dark); color: white; border-color: var(--color-primary-dark); }
    .category-card:hover .catOverlay { background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%); }
    .newsletterInput:focus { border-color: var(--color-primary-dark); }
    @media (max-width: 992px) {
      .hero-slider .swiper-slide .slideTitle { font-size: 3.5rem; }
      .trustBar .grid-cols-4 { grid-template-columns: repeat(2, 1fr); gap: 30px; }
      .highlightSection .grid-cols-2 { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .hero-slider .swiper-slide .slideTitle { font-size: 2.5rem; }
      .trustBar .grid-cols-2 { grid-template-columns: 1fr; }
      .newsletterForm { flex-direction: column; height: auto; box-shadow: none; gap: 10px; }
      .newsletterInput { height: 50px; border-right: 1px solid var(--color-border); border-radius: var(--radius-sm); }
      .newsletterForm button { height: 50px; border-radius: var(--radius-sm); }
    }
  `;
    document.head.appendChild(style);
}

