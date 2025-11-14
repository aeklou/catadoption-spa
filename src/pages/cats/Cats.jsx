import {settings} from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp";
import {useAuth} from "../../services/useAuth.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import "../../assets/css/app.css";

const Cats = () => {
    const {pathname} = useLocation();
    const {user} = useAuth();
    const url = settings.baseApiUrl + "/cats";

    const {
        error,
        isLoading,
        data: catsData
    } = useXmlHttp(url, "GET", {Authorization: `Bearer ${user?.jwt}`});

    if (isLoading) return (
        <div className="main-container">
            <div className="content-card">
                <div className="loading">🐱 Loading our adorable cats...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="main-container">
            <div className="content-card">
                <div className="error">😿 Error: {error.message}</div>
            </div>
        </div>
    );

    return (
        <div className="main-container">
            <div className="content-card">
                <h1 className="page-title">Available Cats</h1>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem'}}>
                    {/* Cats List */}
                    <div>
                        <h2 style={{color: 'var(--burgundy)', marginBottom: '1rem'}}>Find Your Purrfect Match</h2>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            {catsData?.data?.map(cat => (
                                <div
                                    key={cat.cat_id}
                                    style={{
                                        background: 'var(--cream)',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        border: '2px solid var(--light-pink)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    className="cat-item"
                                >
                                    <Link
                                        to={`/cats/${cat.cat_id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}
                                    >
                                        <h3 style={{color: 'var(--burgundy)', marginBottom: '0.5rem'}}>
                                            {cat.name}
                                        </h3>
                                        <p style={{color: 'var(--text-light)', marginBottom: '0.25rem'}}>
                                            <strong>Breed:</strong> {cat.breed || 'Mixed'}
                                        </p>
                                        <p style={{color: 'var(--text-light)', marginBottom: '0.25rem'}}>
                                            <strong>Age:</strong> {cat.age} years
                                        </p>
                                        <p style={{color: 'var(--text-light)', marginBottom: '1rem'}}>
                                            <strong>Color:</strong> {cat.color}
                                        </p>
                                        <button className="btn-secondary" style={{fontSize: '0.875rem'}}>
                                            View Details
                                        </button>
                                    </Link>
                                    <Link
                                        to={`/cats/${cat.cat_id}/adoptions`}
                                        style={{
                                            display: 'block',
                                            marginTop: '0.5rem',
                                            color: 'var(--coral)',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        View Adoption History →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cat Details Area */}
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cats;