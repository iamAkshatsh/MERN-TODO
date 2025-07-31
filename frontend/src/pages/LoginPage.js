import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-black text-white">
      {/* Form Section */}
      <div className="md:w-1/2 p-8">
        <h2 className="text-4xl font-bold mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-full font-semibold shadow-lg transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Animation Section */}
     <div className="flex items-center justify-center w-full p-4">
  <img
    src="lock2.png"
    alt="illustration"
    className="max-w-full h-auto animate-fadeIn"
  />
</div>


    </div>
  );
};

export default LoginPage;
