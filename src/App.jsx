import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import CreateFlight from './pages/CreateFlight';
import EditFlight from './pages/EditFlight';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/main.scss';

function PrivateRoute({ children, allowedRoles }) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function AppContent() {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onmessage = (event) => {
            toast.info(`📢 ${event.data}`, {
                position: 'top-right',
                autoClose: 5000,
            });
        };

        socket.onerror = () => {};

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="app-wrapper">
            <Header />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/analytics" element={<Analytics />} />

                    {/* Керування персоналом */}
                    <Route
                        path="/users"
                        element={(
                            <PrivateRoute allowedRoles={['admin']}>
                                <Users />
                            </PrivateRoute>
                        )}
                    />
                    <Route
                        path="/create-user"
                        element={(
                            <PrivateRoute allowedRoles={['admin']}>
                                <CreateUser />
                            </PrivateRoute>
                        )}
                    />
                    <Route
                        path="/edit-user"
                        element={(
                            <PrivateRoute allowedRoles={['admin']}>
                                <EditUser />
                            </PrivateRoute>
                        )}
                    />

                    {/* Керування рейсами */}
                    <Route
                        path="/create-flight"
                        element={(
                            <PrivateRoute allowedRoles={['admin']}>
                                <CreateFlight />
                            </PrivateRoute>
                        )}
                    />
                    <Route
                        path="/edit-flight"
                        element={(
                            <PrivateRoute allowedRoles={['admin']}>
                                <EditFlight />
                            </PrivateRoute>
                        )}
                    />
                </Routes>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}
