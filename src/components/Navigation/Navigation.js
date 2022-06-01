import { Link } from "react-router-dom";
import './Navigation.css';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/schedule-meeting">Schedule</Link>
                </li>
            </ul>
        </nav>
    );
}