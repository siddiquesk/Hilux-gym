import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';  // MessageCircle liya hai ab

function Icon() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4 p-2 rounded-l-2xl shadow-lg">

      <a
        href="tel:+919301090000"
        className="group p-3 bg-white rounded-full hover:bg-green-500 transition-colors duration-300"
      >
        <Phone className="w-5 h-5 text-black group-hover:text-white" />
      </a>

      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=karan.hiluxfitness@gmail.com&su=Inquiry&body=Hello"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-3 bg-white rounded-full hover:bg-blue-500 transition-colors duration-300"
      >
        <Mail className="w-5 h-5 text-black group-hover:text-white" />
      </a>


      <a
        href="https://wa.me/919301090000?text=How%20May%20I%20Help"
        className="group p-3 bg-white rounded-full hover:bg-green-600 transition-colors duration-300"
      >
        <MessageCircle className="w-5 h-5 text-black group-hover:text-white" />
      </a>

    </div>
  );
}

export default Icon;

