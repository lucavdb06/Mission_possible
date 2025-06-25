import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Radar, Search, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Carte', href: '/map' },
    { name: 'Espace créateur', href: '/create-event' },
    { name: 'Mes sorties', href: '/sorties' },
    { name: 'Premium', href: '/premium' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#230022] backdrop-blur-md border-b border-[#561447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="transform transition-transform duration-200 active:scale-90">
              <img
                src="/logo_final_fond_noir.png"
                alt="Logo CultureRadar"
                className="h-10 sm:h-12 lg:h-14 transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-400 border-b-2 border-primary-400'
                      : 'text-gray-300 hover:text-primary-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and Login */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Trouvez votre prochaine sortie !"
                  className="pl-10 pr-4 py-2 bg-dark-800/50 border border-dark-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
              <div className="relative group">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span>Se connecter</span>
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-lg border border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-t-lg"
                  >
                    Mon Compte
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-b-lg"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-dark-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-400 bg-dark-800/50'
                      : 'text-gray-300 hover:text-primary-300 hover:bg-dark-800/30'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-3 py-2 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Link
                to="/profile"
                className="block mx-3 my-2 text-center bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Mon Compte
              </Link>
              <Link
                to="/login"
                className="block mx-3 my-2 text-center bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      <footer className="bg-[#230022] border-t-[1px] border-[#561447] mt-auto text-xs py-2">
        <div className="text-center text-white/70">
          <p>&copy; 2024 Culture Radar. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
