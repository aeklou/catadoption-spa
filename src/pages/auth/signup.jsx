import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import "../../assets/css/app.css";

const Signup = () => {
    let navigate = useNavigate();
    let [account, setAccount] = useState({
        username: '',
        password: '',
        name: '',
        email: ''
    });
    let { signup, isLoading, error } = useAuth();

    const createAccount = async (e) => {
        e.preventDefault();
        const result = await signup(account);
        if (result.success) {
            navigate('/signin');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    return (
        <div className="main-container">
            <div className="content-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1 className="page-title" style={{ textAlign: 'center' }}>Create Account</h1>
                {error && <div className="error">{error}</div>}
                <form onSubmit={createAccount} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--burgundy)' }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={account.name}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--burgundy)' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={account.email}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--burgundy)' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={account.username}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--burgundy)' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={account.password}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border-light)',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                        style={{ width: '100%' }}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-light)' }}>
                    Already have an account?{' '}
                    <Link
                        to="/signin"
                        style={{ color: 'var(--coral)', textDecoration: 'none', fontWeight: '600' }}
                    >
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;