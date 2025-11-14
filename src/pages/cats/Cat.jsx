import {settings} from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp";
import {useAuth} from "../../services/useAuth.jsx";
import {useParams, Link, Outlet} from "react-router-dom";
import "../../assets/css/cat.css";

const Cat = () => {
    const {user} = useAuth();
    const {catId} = useParams();
    const url = settings.baseApiUrl + "/cats/" + catId;

    const {
        error,
        isLoading,
        data: cat
    } = useXmlHttp(url, "GET", {Authorization: `Bearer ${user?.jwt}`});

    if (isLoading) return <div>Loading cat details...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!cat) return <div>Cat not found</div>;

    return (
        <div className="cat-detail">
            <h2>{cat.name}</h2>
            <p><strong>Breed:</strong> {cat.breed}</p>
            <p><strong>Age:</strong> {cat.age} years</p>
            <p><strong>Gender:</strong> {cat.gender}</p>
            <p><strong>Color:</strong> {cat.color}</p>
            <Link to={`adoptions`}>View Adoption History</Link>
            <Outlet />
        </div>
    );
};

export default Cat;