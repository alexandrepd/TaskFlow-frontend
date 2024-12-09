import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
