import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import { Calendar } from '../../components/Calendar';


const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const {
        authState,
    } = authContext;

    return (
        !!authState.userInfo ? (
            <Calendar/>
        ) : (
            <Navigate to="/login" />
        )
    );
}

export default Dashboard;