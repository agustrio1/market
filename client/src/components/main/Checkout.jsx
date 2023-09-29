import React, { useState } from 'react';

const Checkout = () => {
  // State untuk menyimpan data alamat pengiriman dan metode pembayaran
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    // Lakukan logika pembayaran di sini, misalnya, kirim data pesanan ke server
    // dan tampilkan pesan sukses atau gagal pembayaran
  };

  return (
    <div className="container mx-auto pt-20 py-10">
      <h2 className="text-3xl font-semibold ps-4 mb-6">Checkout</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div>
          <h3 className="text-xl font-semibold mb-4">Alamat Pengiriman</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">Nama Lengkap:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                className="border rounded-lg w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-600">Alamat:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                className="border rounded-lg w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-600">Kota:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleAddressChange}
                className="border rounded-lg w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-gray-600">Kode Pos:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
                className="border rounded-lg w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-600">Negara:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
                className="border rounded-lg w-full py-2 px-3"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Metode Pembayaran</h3>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-600">Pilih Metode Pembayaran:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="border rounded-lg w-full py-2 px-3"
            >
              <option value="Credit Card">Kartu Kredit</option>
              <option value="PayPal">PayPal</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h3>
          {/* Tampilkan ringkasan pesanan seperti item, harga, subtotal, dan total */}
        </div>
        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;