"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 px-6 bg-[#fefefe]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in-up">
          Choisissez le plan adapté à votre besoin
        </h2>

        <div
          className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              isAnnual
                ? "bg-[#003e3a] text-white shadow-lg shadow-[#478577]/30"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Annuel
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              !isAnnual
                ? "bg-[#003e3a] text-white shadow-lg shadow-[#478577]/30"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Mensuel
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Famille */}
          <div
            className="border-2 border-gray-200 rounded-lg p-8 hover:border-[#003e3a] hover:shadow-xl hover:shadow-[#478577]/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <h3 className="text-2xl font-bold mb-2">Famille</h3>
            <p className="text-gray-600 mb-6">Pour les particuliers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#003e3a]">10,99€</span>
              <span className="text-gray-600"> / mois TTC</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Jusqu'à 5 profils</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Messagerie texte</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Partage de photos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Visioconférence</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Support client</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  className="text-[#003e3a] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span>Stockage 10GB</span>
              </li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition-all duration-300 hover:shadow-lg">
              Choisir
            </button>
          </div>

          {/* Professionnel */}
          <div
            className="border-2 border-[#003e3a] bg-[#003e3a] text-white rounded-lg p-8 relative shadow-xl shadow-[#478577]/30 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              Populaire
            </div>
            <h3 className="text-2xl font-bold mb-2">Professionnel</h3>
            <p className="text-gray-200 mb-6">Pour les structures</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">29,99€</span>
              <span className="text-gray-200"> / mois TTC</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Profils illimités</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Messagerie texte</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Partage de photos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Visioconférence</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Support prioritaire</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Stockage 100GB</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Gestion multi-sites</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Statistiques avancées</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>Formation personnalisée</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                <span>API Access</span>
              </li>
            </ul>
            <button className="w-full bg-white text-[#003e3a] py-3 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
              Choisir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
