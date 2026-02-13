"use client";

import { Clock, Headset, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent } from "react";

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-20 bg-[#003e3a] text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">Nous contacter</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="animate-slide-in-left" style={{opacity: 0}}>
            <h3 className="text-2xl font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <Mail className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Email</div>
                  <a
                    href="mailto:contact@bavardo.fr"
                    className="text-gray-200 hover:text-white"
                  >
                    contact@bavardo.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <Phone className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Téléphone</div>
                  <a
                    href="tel:+33123456789"
                    className="text-gray-200 hover:text-white"
                  >
                    01 23 45 67 89
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <MapPin className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Adresse</div>
                  <p className="text-gray-200">
                    123 Avenue de la République
                    <br />
                    75011 Paris, France
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <Clock className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Horaires</div>
                  <p className="text-gray-200">
                    Lundi - Vendredi : 9h - 18h
                    <br />
                  Samedi - Dimanche : Fermé
                </p>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <Headset className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Support</div>
                  <p className="text-gray-200">
                    Email : support@bavardo.fr
                    <br />
                    Disponible 24h/24, 7j/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right" style={{opacity: 0}}>
            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#478577] transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#478577] transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium"
                >
                  Objet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#478577] transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#478577] resize-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-[#003e3a] py-3 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-[#478577]/30 hover:scale-105"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-gray-300">
          <p>© 2025 Bavardo - Créer du lien depuis 2020</p>
        </div>
      </div>
      </div>
    </section>
  );  
}
