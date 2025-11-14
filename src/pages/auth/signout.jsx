import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/useAuth";

const Signout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/signin');
    }, [logout, navigate]);

    return (
        <div className="main-container">
            <div className="content-card">
                <h1 className="page-title">Signing Out...</h1>
                <p>You are being redirected to the sign in page.</p>
            </div>
        </div>
    );
};

export default Signout;