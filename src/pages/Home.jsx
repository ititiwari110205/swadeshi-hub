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

    return (
        <div className="home-page">
            {/* Hero Slider */}
            <section className="hero-slider" style={{ position: 'relative', overflow: 'hidden' }}>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    speed={1500}
                    className="main-hero-swiper"
                >
                    {slides.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <div className="slide-wrapper" style={styles.slide}>
                                <div className="slide-bg" style={{ ...styles.slideBg, backgroundImage: `url(${slide.image})` }} />
                                <div className="slide-overlay" style={styles.slideOverlay} />
                                <div className="container slide-content-container">
                                    <div style={styles.slideContent} className="hero-content-reveal">
                                        <span style={styles.slideKicker}>Premium Heritage</span>
                                        <h1 className="hero-title" style={styles.slideTitle}>{slide.title}</h1>
                                        <p className="hero-subtitle" style={styles.slideSubtitle}>{slide.subtitle}</p>
                                        <div className="hero-actions" style={{ marginTop: '40px' }}>
                                            <Link to="/categories" className="btn btn-secondary hero-btn">
                                                Explore Collection
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Features/Trust Bar */}
            <section className="trust-bar section-padding" style={styles.trustBar}>
                <div className="container grid grid-cols-4 gap-8 sm-grid-cols-1" style={{ textAlign: 'center' }}>
                    <div className="trust-item" style={styles.trustItem}>
                        <div className="trust-icon-wrapper"><Scissors size={32} color="var(--color-secondary)" /></div>
                        <h4 style={styles.trustTitle}>Bespoke Tailoring</h4>
                        <p style={styles.trustDesc}>Custom fit to your exact measurements</p>
                    </div>
                    <div className="trust-item" style={styles.trustItem}>
                        <div className="trust-icon-wrapper"><ShieldCheck size={32} color="var(--color-secondary)" /></div>
                        <h4 style={styles.trustTitle}>Premium Fabrics</h4>
                        <p style={styles.trustDesc}>Ethically sourced silks and cottons</p>
                    </div>
                    <div className="trust-item" style={styles.trustItem}>
                        <div className="trust-icon-wrapper"><Truck size={32} color="var(--color-secondary)" /></div>
                        <h4 style={styles.trustTitle}>Global Shipping</h4>
                        <p style={styles.trustDesc}>Worldwide secure delivery directly to you</p>
                    </div>
                    <div className="trust-item" style={styles.trustItem}>
                        <div className="trust-icon-wrapper"><Ruler size={32} color="var(--color-secondary)" /></div>
                        <h4 style={styles.trustTitle}>Perfect Fit Guarantee</h4>
                        <p style={styles.trustDesc}>Complimentary alterations on request</p>
                    </div>
                </div>
            </section>

            {/* Categories - Magazine Style */}
            <section className="categories-section section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div className="section-header" style={styles.sectionHeader}>
                        <h2 className="section-title" style={styles.sectionTitle}>Curated Collections</h2>
                        <div className="divider" style={styles.divider}></div>
                    </div>
                    <div className="grid grid-cols-4 gap-6 category-grid" style={{ marginTop: '40px' }}>
                        {categories.slice(0, 4).map((cat, index) => (
                            <Link to={`/category/${cat.id}`} key={cat.id} className={`category-card hover-lift cat-card-${index + 1}`} style={styles.categoryCard}>
                                <div className="cat-overlay" style={styles.catOverlay} />
                                <div className="cat-content" style={styles.catContent}>
                                    <h3 style={styles.catTitle}>{cat.name}</h3>
                                    <span style={styles.catLink}>Discover <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section section-padding">
                <div className="container">
                    <div className="section-header" style={styles.sectionHeader}>
                        <h2 className="section-title" style={styles.sectionTitle}>The Royal Edit</h2>
                        <div className="divider" style={styles.divider}></div>
                        <p className="section-desc" style={styles.sectionDesc}>Discover our most sought-after pieces, crafted with extraordinary attention to detail for your special occasions.</p>
                    </div>
                    <div className="grid grid-cols-4 gap-6 product-grid">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="product-card hover-lift" style={styles.productCard}>
                                <Link to={`/product/${product.id}`} className="product-img-container" style={styles.productImgContainer}>
                                    <img src={product.image} alt={product.name} className="product-img" style={styles.productImg} />
                                    {product.stock < 10 && <span className="badge badge-error" style={styles.badge}>Rare Find</span>}
                                </Link>
                                <div className="product-info" style={styles.productInfo}>
                                    <div className="product-meta" style={styles.productMeta}>
                                        <span className="product-cat" style={styles.productCat}>{categories.find(c => c.id === product.categoryId)?.name}</span>
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
                </div>
            </section>

            {/* Bespoke Highlights */}
            <section className="highlight-section section-padding" style={styles.highlightSection}>
                <div className="container grid grid-cols-2 gap-12 items-center sm-grid-cols-1">
                    <div className="highlight-content" style={{ paddingRight: '0' }}>
                        <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Our Heritage</h4>
                        <h2 className="highlight-title" style={styles.highlightTitle}>The Art of Zardozi<br /><span className="highlight-italic" style={{ fontStyle: 'italic', fontWeight: '400', color: 'var(--color-secondary-light)' }}>& Master Craftsmanship</span></h2>
                        <p className="highlight-text" style={styles.highlightText}>
                            At Swadeshi Hub, every garment tells a story. We employ generational artisans who preserve the dying arts of hand-embroidery. From majestic Sherwanis to everyday classic Kurta Pyjamas, experience the royal heritage tailored precisely to your form.
                        </p>
                        <Link to="/about" className="btn btn-secondary">Discover The Process</Link>
                    </div>
                    <div className="highlight-image-wrapper" style={{ position: 'relative' }}>
                        <img src="https://image.pollinations.ai/prompt/Indian%20tailor%20crafting%20traditional%20mens%20sherwani%20golden%20embroidery?width=800&height=600&nologo=true" alt="Craftsmanship" className="highlight-img" style={{ borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-premium)', width: '100%' }} />
                        <div className="experience-badge sm-hide" style={styles.experienceBadge}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)', lineHeight: 1 }}>30</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.2 }}>Years of<br />Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section section-padding" style={styles.newsletterSection}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 className="newsletter-title" style={styles.newsletterTitle}>Join The Inner Circle</h2>
                    <p className="newsletter-desc" style={styles.newsletterDesc}>Subscribe to receive early access to new collections, exclusive bespoke events, and styling advice.</p>
                    <form className="newsletter-form flex sm-flex-col" style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email address" className="newsletter-input" style={styles.newsletterInput} required />
                        <button type="submit" className="btn btn-primary newsletter-btn">Subscribe</button>
                    </form>
                </div>
            </section>

            <style>{`
                .main-hero-swiper { height: 90vh; min-height: 600px; }
                .hero-title { font-size: clamp(2.8rem, 8vw, 5.5rem); line-height: 1; margin-bottom: 24px; }
                .hero-subtitle { font-size: clamp(1.1rem, 3vw, 1.4rem); max-width: 600px; margin-bottom: 30px; }
                .hero-btn { width: auto !important; padding: 16px 48px !important; }
                
                /* Text reveal animation on slide active */
                .swiper-slide-active .hero-title {
                    animation: textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .swiper-slide-active .hero-subtitle {
                    animation: textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
                    opacity: 0;
                }
                .swiper-slide-active .hero-btn {
                    animation: textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
                    opacity: 0;
                }
                .swiper-slide-active .slide-bg {
                    animation: zoomBg 10s ease-out infinite alternate;
                }

                @keyframes textReveal {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes zoomBg {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }

                .category-card { height: 450px; }
                .cat-card-2, .cat-card-4 { height: 400px; margin-top: 50px; }
                
                .product-img-container { position: relative; display: block; padding-top: 133%; overflow: hidden; }
                .product-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
                .product-card:hover .product-img { transform: scale(1.08); }
                
                .add-to-cart-btn {
                    background-color: var(--color-bg);
                    color: var(--color-primary);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--color-border);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .add-to-cart-btn:hover { background-color: var(--color-primary-dark); color: white; border-color: var(--color-primary-dark); }
                
                .newsletter-form { height: 56px; gap: 0; }
                .newsletter-btn { border-radius: 0 var(--radius-sm) var(--radius-sm) 0 !important; height: 56px; }
                
                @media (max-width: 992px) {
                    .main-hero-swiper { height: 75vh; }
                    .category-grid { grid-template-columns: repeat(2, 1fr); }
                    .cat-card-2, .cat-card-4 { margin-top: 0; }
                    .highlight-title { font-size: 2.5rem !important; }
                }
                
                @media (max-width: 768px) {
                    .main-hero-swiper { height: 70vh; min-height: 450px; }
                    .hero-title { text-align: center; }
                    .hero-subtitle { text-align: center; font-size: 1rem; margin: 0 auto 30px; }
                    .hero-btn { width: 100% !important; }
                    .slide-content-container { display: flex; flex-direction: column; align-items: center; justify-content: center; }
                    .slide-content { text-align: center; }
                    
                    .section-title { font-size: 2.2rem !important; }
                    .trust-item { padding: 30px 20px; border-bottom: 1px solid var(--color-border); }
                    .trust-item:last-child { border-bottom: none; }
                    
                    .newsletter-form { height: auto; flex-direction: column; gap: 10px; }
                    .newsletter-input { border-radius: var(--radius-sm) !important; border-right: 1px solid var(--color-border) !important; height: 50px; }
                    .newsletter-btn { border-radius: var(--radius-sm) !important; height: 50px; width: 100% !important; }
                    
                    .highlight-section { padding: 80px 0; }
                    .highlight-title { font-size: 2rem !important; text-align: center; }
                    .highlight-text { text-align: center; font-size: 1rem !important; }
                    .highlight-content { display: flex; flex-direction: column; align-items: center; }
                }

                @media (max-width: 480px) {
                    .category-grid { grid-template-columns: 1fr; }
                    .category-card { height: 320px; }
                    .hero-title { font-size: 2.5rem; }
                }
            `}</style>
        </div>
    );
}

const styles = {
    slide: { position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center' },
    slideBg: { position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat', transition: 'transform 10s ease-out' },
    slideOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 100%)' },
    slideContent: { position: 'relative', zIndex: 10, color: 'white', maxWidth: '800px' },
    slideKicker: { display: 'inline-block', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', marginBottom: '16px', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
    slideTitle: { fontWeight: '600', textShadow: '0 4px 12px rgba(0,0,0,0.5)', letterSpacing: '-0.02em' },
    slideSubtitle: { fontWeight: '400', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, textShadow: '0 2px 8px rgba(0,0,0,0.4)' },
    trustBar: { backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' },
    trustItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
    trustTitle: { fontSize: '1.1rem', margin: 0, color: 'var(--color-text)', fontWeight: '600' },
    trustDesc: { fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 },
    sectionHeader: { textAlign: 'center', marginBottom: '60px' },
    sectionTitle: { fontSize: '3rem', fontWeight: '500', marginBottom: '20px' },
    divider: { height: '3px', width: '80px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' },
    sectionDesc: { color: 'var(--color-text-muted)', marginTop: '20px', maxWidth: '700px', margin: '20px auto 0', fontSize: '1.1rem' },
    categoryCard: { position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--color-primary-dark)' },
    catOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)', transition: 'background 0.5s ease' },
    catContent: { position: 'relative', zIndex: 10, padding: '30px', width: '100%', transition: 'transform 0.5s ease' },
    catTitle: { color: 'white', fontSize: '1.8rem', margin: 0, marginBottom: '8px', fontWeight: '500' },
    catLink: { color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '1px' },
    productCard: { background: 'white', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)', transition: 'all 0.4s ease' },
    productImgContainer: { position: 'relative', display: 'block', paddingTop: '133%', overflow: 'hidden' },
    productImg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' },
    badge: { position: 'absolute', top: '12px', left: '12px', zIndex: 10 },
    productInfo: { padding: '24px' },
    productMeta: { marginBottom: '8px' },
    productCat: { color: 'var(--color-text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' },
    productName: { fontSize: '1.15rem', fontWeight: '500', color: 'var(--color-text)', marginBottom: '15px', lineHeight: 1.4, height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
    productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
    productPrice: { fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-primary-dark)' },
    highlightSection: { backgroundColor: 'var(--color-primary-dark)', color: 'white' },
    highlightTitle: { fontSize: '3.5rem', marginBottom: '25px', color: 'var(--color-surface)', lineHeight: 1.1 },
    highlightText: { fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '35px', lineHeight: 1.8 },
    experienceBadge: { position: 'absolute', bottom: '-25px', left: '-25px', backgroundColor: 'var(--color-secondary)', padding: '24px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-premium)', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10 },
    newsletterSection: { backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' },
    newsletterTitle: { fontSize: '2.8rem', marginBottom: '15px' },
    newsletterDesc: { color: 'var(--color-text-muted)', marginBottom: '35px', fontSize: '1.15rem' },
    newsletterForm: { boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-md)', backgroundColor: 'white', border: '1px solid var(--color-border)' },
    newsletterInput: { flex: 1, padding: '0 24px', border: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }
};

