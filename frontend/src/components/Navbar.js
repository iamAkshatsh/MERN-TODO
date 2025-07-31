import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-zinc-900 p-4 shadow-lg">
      <div className="text-xl font-bold tracking-wide text-white">📝 BlackBoard Tasks</div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-gray-300">
          <User size={18} />
          {user?.name || 'User'}

        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full flex items-center gap-1 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
