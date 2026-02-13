"use client";

import { colors, zIndex } from '@/styles/theme';

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#valeurs', label: 'À propos' },
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 backdrop-blur-sm bg-opacity-95 border-b border-gray-100 animate-fade-in"
      style={{ 
        backgroundColor: colors.background,
        zIndex: zIndex.fixed 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div 
            className="w-8 h-8 rounded-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary,
              boxShadow: `0 4px 6px -1px rgba(71, 133, 119, 0.3)`
            }}
          >
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span 
            className="font-bold text-xl"
            style={{ color: colors.primary }}
          >
            BAVARDO
          </span>
        </div>

        {/* Navigation */}
        <nav 
          className="hidden md:flex items-center gap-8 animate-fade-in" 
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 transition-all duration-300 hover:scale-105"
              style={{ 
                color: colors.textSecondary,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <button 
          className="px-6 py-2 rounded-md text-white font-medium transition-all duration-300 hover:scale-105 animate-slide-in-right" 
          style={{ 
            backgroundColor: colors.primary,
            animationDelay: '0.3s', 
            opacity: 0 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${colors.primary}e6`;
            e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(71, 133, 119, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Se connecter
        </button>
      </div>
    </header>
  );
}
