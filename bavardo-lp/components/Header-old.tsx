"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fefefe] z-50 border-b border-gray-100 backdrop-blur-sm bg-opacity-95 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div className="w-8 h-8 bg-[#003e3a] rounded-sm flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-[#478577]/30 transition-all duration-300">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-xl text-[#003e3a]">BAVARDO</span>
        </div>

        <nav
          className="hidden md:flex items-center gap-8 animate-fade-in"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <a
            href="#"
            className="text-gray-700 hover:text-[#003e3a] transition-all duration-300 hover:scale-105"
          >
            Accueil
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-[#003e3a] transition-all duration-300 hover:scale-105"
          >
            À propos
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-[#003e3a] transition-all duration-300 hover:scale-105"
          >
            Fonctionnalités
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-[#003e3a] transition-all duration-300 hover:scale-105"
          >
            Tarifs
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-[#003e3a] transition-all duration-300 hover:scale-105"
          >
            Contact
          </a>
        </nav>

        <button
          className="bg-[#003e3a] text-white px-6 py-2 rounded-md hover:bg-[#003e3a]/90 hover:shadow-lg hover:shadow-[#478577]/30 transition-all duration-300 hover:scale-105 animate-slide-in-right"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          Se connecter
        </button>
      </div>
    </header>
  );
}
