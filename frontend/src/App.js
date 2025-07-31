import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Pages where we do NOT want Navbar/Footer
  const noLayoutPaths = ['/login', '/register'];
  const isLayoutHidden = noLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!isLayoutHidden && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={user ? <TodoPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {!isLayoutHidden && <Footer />}
    </div>
  );
}

export default App;
