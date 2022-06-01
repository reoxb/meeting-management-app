import './App.css';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { AuthProvider, AuthConsumer } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const PrivateWrapper = () => (
  <AuthConsumer>
    {({ authState }) => {
      return (
        !!authState.userInfo ? (
          <Outlet />
        ) : (
          <Navigate to={'/login'} />
        )
      )
    }
    }
  </AuthConsumer>
)

function App() {
  return (
    <div>
      <AuthProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route element={<PrivateWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule-meeting" element={<Schedule />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
