import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Categories() {
    const { categories, products } = useAppContext();

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '15px' }}>Curated Selections</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--color-primary-dark)' }}>Our Collections</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)', margin: '0 auto' }}></div>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '25px', fontSize: '1.1rem', maxWidth: '600px', margin: '25px auto', lineHeight: 1.8 }}>
                    Explore our complete range of authentic Indian traditional wear for men. Carefully curated for your special moments, crafted with extraordinary attention to detail.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8" style={{ marginTop: '50px' }}>
                {categories.map((cat, idx) => {
                    // get first product image as fallback or placeholder
                    const catProduct = products.find(p => p.categoryId === cat.id);
                    let bgImage = "https://image.pollinations.ai/prompt/Indian%20Groom%20Royal%20Sherwani%20wedding%20background?width=1000&height=800&nologo=true";

                    if (idx === 0) bgImage = "https://image.pollinations.ai/prompt/Indian%20Men%20wearing%20Kurta%20Pyjama%20festive%20background%20highly%20detailed?width=1000&height=800&nologo=true";
                    else if (idx === 2) bgImage = "https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Nehru%20Jacket%20over%20kurta%20elegant%20pose?width=1000&height=800&nologo=true";
                    else if (idx === 3) bgImage = "https://image.pollinations.ai/prompt/Indian%20Man%20wearing%20Dhoti%20Kurta%20traditional%20puja%20background?width=1000&height=800&nologo=true";
                    else if (catProduct) bgImage = catProduct.image;

                    return (
                        <Link to={`/category/${cat.id}`} key={cat.id} className="hover-lift" style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '450px', display: 'flex', alignItems: 'flex-end', border: '1px solid var(--color-border)' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} className="cat-bg" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)', transition: 'background 0.4s ease' }} className="cat-overlay" />
                            <div style={{ position: 'relative', zIndex: 10, padding: '40px', color: 'white', width: '100%' }}>
                                <span style={{ color: 'var(--color-secondary-light)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '10px' }}>
                                    Collection {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h2 style={{ fontSize: '2.5rem', margin: '0 0 15px', color: 'white', fontFamily: 'Playfair Display' }}>{cat.name}</h2>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '25px', maxWidth: '90%', lineHeight: 1.6 }}>
                                    {cat.description}
                                </p>
                                <span className="cat-explore" style={{ borderBottom: '1px solid var(--color-secondary)', color: 'white', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', display: 'inline-block', transition: 'all 0.3s ease' }}>
                                    Explore Edit
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    a.hover-lift:hover .cat-bg { transform: scale(1.08); }
    a.hover-lift:hover .cat-overlay { background: linear-gradient(to top, rgba(10,5,5,1) 0%, rgba(10,5,5,0.4) 60%, rgba(0,0,0,0) 100%); }
    a.hover-lift:hover .cat-explore { color: var(--color-secondary); padding-right: 15px; }
  `;
    document.head.appendChild(style);
}
