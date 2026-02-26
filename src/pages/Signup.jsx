import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mail, Lock, User, CheckCircle } from 'lucide-react';

export default function Signup() {
    const { signup, verifyEmail } = useAppContext();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = Signup Form, 2 = Verification OTP, 3 = Success
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup(formData);
            setStep(2); // Proceed to verification
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp !== '123456') {
            setError("Invalid Code. Use 123456 for demo.");
            return;
        }
        setError('');
        setLoading(true);
        try {
            await verifyEmail(formData.email);
            setStep(3);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError("Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.imageCol}></div>
                <div style={styles.formCol}>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Join swadeshi</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>Create an account to explore premium Indian ethnic wear.</p>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleSignup} className="fade-in">
                            {error && <div style={styles.errorBanner}>{error}</div>}

                            <div className="form-group" style={{ position: 'relative' }}>
                                <User size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="Full Name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ position: 'relative' }}>
                                <Lock size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="password"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="Password"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ position: 'relative', marginBottom: '30px' }}>
                                <Lock size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="password"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="Confirm Password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={styles.btn} disabled={loading}>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '30px' }}>
                                Already have an account? <Link to="/login" style={{ color: 'var(--color-secondary)', fontWeight: '600' }}>Log In</Link>
                            </p>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerify} className="fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <Mail size={50} color="var(--color-secondary)" style={{ margin: '0 auto 20px' }} />
                            <h2 style={{ marginBottom: '15px' }}>Verify Your Email</h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>We have sent a 6-digit verification code to <strong>{formData.email}</strong>. Entering <strong>123456</strong> will verify it for this demo.</p>

                            {error && <div style={styles.errorBanner}>{error}</div>}

                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter 6-digit code"
                                    required
                                    maxLength={6}
                                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px', fontWeight: 'bold' }}
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={styles.btn} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
                            <CheckCircle size={60} color="var(--color-success)" style={{ margin: '0 auto 20px' }} />
                            <h2 style={{ color: 'var(--color-success)', marginBottom: '15px' }}>Account Verified!</h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>Your account has been successfully verified. Let's start shopping!</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        padding: '40px 20px'
    },
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-premium)',
        overflow: 'hidden',
        minHeight: '600px'
    },
    imageCol: {
        flex: 1,
        backgroundImage: 'url(https://image.pollinations.ai/prompt/Midnight%20Blue%20Velvet%20Sherwani%20Indian%20Groom%20fashion?width=800&height=1000&nologo=true)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'none' // will show via media query
    },
    formCol: {
        flex: 1,
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    },
    icon: {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    btn: {
        width: '100%',
        padding: '16px',
        fontSize: '1.1rem'
    },
    errorBanner: {
        padding: '12px',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        color: 'var(--color-error)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '0.9rem'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @media (min-width: 768px) {
      div[style*="imageCol"] { display: block !important; }
    }
  `;
    document.head.appendChild(style);
}
