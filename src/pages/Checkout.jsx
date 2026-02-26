import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Checkout() {
    const { cart, getCartTotal, placeOrder, user } = useAppContext();
    const navigate = useNavigate();
    const total = getCartTotal();

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        mobile: '',
        houseNo: '',
        street: '',
        area: '',
        city: '',
        district: '',
        state: '',
        pincode: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        // Options for Razorpay
        const options = {
            key: 'rzp_test_TYs0v7G8vUfAIt', // Optional test key for demo purposes
            amount: total * 100, // Amount in paise
            currency: 'INR',
            name: 'Swadeshi Hub',
            description: 'Payment for your traditional wear',
            image: 'https://image.pollinations.ai/prompt/Royal%20Indian%20Mens%20Sherwani%20Luxury%20Brand%20Logo?width=150&height=150&nologo=true',
            handler: function (response) {
                // Handle success
                const orderDetails = {
                    address: formData,
                    paymentId: response.razorpay_payment_id || 'mock_pay_id_' + Date.now()
                };
                const order = placeOrder(orderDetails);
                navigate('/success', { state: { orderId: order.id } });
            },
            prefill: {
                name: formData.fullName,
                email: user?.email || 'guest@example.com',
                contact: formData.mobile
            },
            theme: {
                color: '#800020'
            }
        };

        try {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            // Handle payment failure dialog close
            paymentObject.on('payment.failed', function (response) {
                alert("Payment Failed. Reason: " + response.error.description);
            });
        } catch (err) {
            // Fallback for demo if generic test key fails without order_id
            const orderDetails = { address: formData, paymentId: 'demo_pay_id_' + Date.now() };
            const order = placeOrder(orderDetails);
            navigate('/success', { state: { orderId: order.id, simulated: true } });
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return null;

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            <div style={{ marginBottom: '50px' }}>
                <h4 style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '10px' }}>Secure Process</h4>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', color: 'var(--color-primary-dark)' }}>Checkout</h1>
                <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--color-secondary)' }}></div>
            </div>

            <div className="grid grid-cols-3 gap-10">

                {/* Address Form */}
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', padding: '50px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                        <h2 style={{ paddingBottom: '20px', marginBottom: '30px', fontWeight: '500', fontSize: '1.8rem', color: 'var(--color-text)' }}>Delivery Detalis</h2>

                        <form onSubmit={handlePayment} id="checkout-form">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mobile Number</label>
                                    <input type="tel" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>House / Flat No.</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.houseNo} onChange={e => setFormData({ ...formData, houseNo: e.target.value })} />
                                </div>

                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Street / Colony Address</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Area / Landmark</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>City</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>District</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>State</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Postal Code</label>
                                    <input type="text" className="form-input" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xs)' }} required value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', borderBottom: '1px solid var(--color-border)', paddingBottom: '15px', fontWeight: '500' }}>Order Verification</h3>

                        <div style={{ marginBottom: '25px', maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.95rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <span style={{ color: 'var(--color-text)', display: 'block', fontWeight: '500' }}>{item.name}</span>
                                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <span style={{ fontWeight: '500', color: 'var(--color-primary-dark)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0 25px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', fontSize: '1.5rem', fontWeight: '600' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--color-primary-dark)' }}>₹{total.toLocaleString('en-IN')}</span>
                        </div>

                        <div style={{ backgroundColor: 'var(--color-bg)', padding: '15px', borderRadius: 'var(--radius-xs)', marginBottom: '25px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <ShieldCheck size={20} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>100% Secure Payment processing by Razorpay. (COD Disabled)</p>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : <><CreditCard size={20} style={{ marginRight: '10px' }} /> Confirm & Pay</>}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
