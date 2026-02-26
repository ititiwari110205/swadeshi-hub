import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
    const { login } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.formCol}>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>Log in to access your orders and saved items.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="fade-in">
                        {error && <div style={styles.errorBanner}>{error}</div>}

                        <div className="form-group" style={{ position: 'relative' }}>
                            <label className="form-label" style={{ marginBottom: '10px', display: 'block' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="e.g. user@swadeshi.com"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ position: 'relative', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label" style={{ margin: 0 }}>Password</label>
                                <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>Forgot Password?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="var(--color-text-muted)" style={styles.icon} />
                                <input
                                    type="password"
                                    className="form-input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="Enter your password"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={styles.btn} disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>

                        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            <p><strong>Demo Credentials:</strong></p>
                            <p>User: any email, min 6 char password</p>

                        </div>

                        <p style={{ textAlign: 'center', marginTop: '30px' }}>
                            Don't have an account? <Link to="/signup" style={{ color: 'var(--color-secondary)', fontWeight: '600' }}>Sign Up</Link>
                        </p>
                    </form>
                </div>
                <div style={styles.imageCol}></div>
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
        backgroundImage: 'url(https://image.pollinations.ai/prompt/Golden%20Brocade%20Nehru%20Jacket%20over%20white%20kurta%20Indian%20Men%20fashion?width=800&height=1000&nologo=true)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'none' // handled via css injection
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
