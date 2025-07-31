import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 👇 Send `name` (not username)
      await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password
      });
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-black text-white">
      <div className="md:w-1/2 p-8">
        <h2 className="text-4xl font-bold mb-6">Create Your Account 🚀</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center w-full p-4">
        <img
          src="register.png"
          alt="illustration"
          className="max-w-full h-auto animate-fadeIn"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
