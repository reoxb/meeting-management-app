import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import { Calendar } from '../../components/Calendar';
import { Navigation } from '../../components/Navigation';


const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const {
        authState,
    } = authContext;

    return (
        !!authState.userInfo ? (
            <>
                <Navigation />
                <div className="container">
                    <Calendar/>
                </div>
            </>
        ) : (
            <Navigate to="/login" />
        )
    );
}

export default Dashboard;