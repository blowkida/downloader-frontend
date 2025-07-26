import React from 'react';

export default function DonatePopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <h2 className="text-lg font-bold mb-4 text-orange-600">Support Our Work</h2>
        <img src="/qr-code.png" alt="QR Code" className="w-40 mx-auto mb-4" />
        <p className="text-sm text-gray-700 text-center">UPI ID: <strong>yourupi@upi</strong></p>
        <p className="text-sm text-gray-700 text-center">PayPal: <strong>manishants@gmail.com</strong></p>
      </div>
    </div>
  );
}
