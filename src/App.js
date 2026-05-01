import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import EditTask from './components/EditTask';
import AdminUsers from './components/AdminUsers';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/admin" element={<AdminUsers />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
