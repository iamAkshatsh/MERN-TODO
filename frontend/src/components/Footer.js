import { Instagram, Mail, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-800 text-gray-200 mt-10 shadow-inner border-t border-zinc-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* App Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">📝 BlackBoard Tasks</h4>
          <p className="text-gray-400">
            A sleek and modern task manager to keep you focused and organized.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 6291698898
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> akshat122002shah@gmail.com
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Follow Me</h4>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.instagram.com/_akshat_shah__?igsh=NmhjaWtyZHZ4OXh2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <Instagram />
            </a>
            <a
              href="https://wa.me/916291698898"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <MessageSquare />
            </a>
            <a
              href="mailto:akshat122002@gmail.com"
              className="hover:text-red-400 transition"
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-zinc-700">
        © {new Date().getFullYear()} Akshat Shah. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
