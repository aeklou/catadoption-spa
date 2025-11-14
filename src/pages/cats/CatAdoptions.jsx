import { settings } from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp";
import { useAuth } from "../../services/useAuth.jsx";
import { useParams } from "react-router-dom";
import "../../assets/css/app.css";

const CatAdoptions = () => {
    const { user } = useAuth();
    const { catId } = useParams();
    const url = `${settings.baseApiUrl}/cats/${catId}/adoptions`;

    const {
        error,
        isLoading,
        data: adoptionsData
    } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user?.jwt}` });

    if (isLoading) return <div className="loading">Loading adoption history...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="adoption-history">
            <h3>Adoption History</h3>
            {adoptionsData?.data?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {adoptionsData.data.map(adoption => (
                        <div key={adoption.adoption_id} className="adoption-item">
                            <p><strong>Adopter:</strong> {adoption.adopter_name}</p>
                            <p><strong>Date:</strong> {new Date(adoption.adoption_date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {adoption.status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No adoption history found for this cat.</p>
            )}
        </div>
    );
};

export default CatAdoptions;