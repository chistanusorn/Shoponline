'use client'

import React, { useState } from 'react';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, Search, Heart, Menu } from 'lucide-react';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";

const products = [
  { id: 1, name: "Special Gift Box Type A คุณอาเรียโต๊ะข้างๆ พูดรัสเซียหวานใส่ซะหัวใจจะวาย", price: 990.00, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/m/e/mer4190-01.jpg", category: "Book" },
  { id: 2, name: "Special Gift Box Type B คุณอาเรียโต๊ะข้างๆ พูดรัสเซียหวานใส่ซะหัวใจจะวาย", price: 990.00, image: "https://www.phoenixnext.com/img/600/1000/resize/catalog/product/m/e/mer4191-01.jpg", category: "Book" },
  { id: 3, name: "(LN) Complete Set คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย เล่ม 6", price: 1485.00, image: "https://www.phoenixnext.com/img/600/1000/resize/catalog/product/b/x/bx0428-01.jpg", category: "Book" },
  { id: 4, name: "(LN) Complete Set คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย เล่ม 7", price: 1510.00, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/b/x/bx0512-01.jpg", category: "Book" },
  { id: 5, name: "(LN) Complete Set คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย เล่ม 8", price: 1510.00, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/b/x/bx0574-01.jpg", category: "Book" },
  { id: 6, name: "(MG) Complete Set คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย (การ์ตูน) เล่ม 4", price: 1250, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/b/x/bx0594-01.jpg", category: "Book" },
  { id: 7, name: "(MG) คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย เล่ม 2 [แถมฟรี! Postcard]", price: 160, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/f/r/free_postcard_arya_2.jpg", category: "Book" },
  { id: 8, name: "(MD) Tokidoki Bosotto Arya-san A1 Tapestry คุณอาเรียโต๊ะข้างๆ พูดรัสเซียหวานใส่ซะหัวใจจะวาย", price: 950.00, image: "https://www.phoenixnext.com/img/600/744/resize/catalog/product/m/e/mer2464-01.jpg", category: "Book" },
  { id: 9, name: "(AB) Complete Set คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย หนังสือรวมภาพของโมโมโกะ", price: 1450.00, image: "https://www.phoenixnext.com/img/600/1000/resize/catalog/product/b/x/bx0588-01.jpg", category: "Tapestry" },
  { id: 10, name: "Tokidoki Bosotto Arya-san 3D Oppai Mouse Pad Type E คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย (Illust: Maid)", price: 990.00, image: "https://www.phoenixnext.com/img/600/1000/resize/catalog/product/m/e/mer2671-01.jpg", category: "Mouse pad" },
];

export default function EnhancedEcommerceShoppingCart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10);
    } else if (couponCode === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping - discount;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500">
      {/* Navigation */}
      <nav className="bg-white shadow-md z-10 relative">
  <div className="container mx-auto px-6 py-3 flex justify-between items-center">
    <div className="flex items-center">
      <img 
        src="https://cdn.donmai.us/sample/6f/61/__alisa_mikhailovna_kujou_tokidoki_bosotto_roshia_go_de_dereru_tonari_no_alya_san_drawn_by_momoko_momopoco__sample-6f61611087aa3ac81ceae1f0a5161c89.jpg" 
        alt="Alisa Mikhailovna Kujou"
        className="h-16 w-16 object-cover mr-4 rounded-md shadow-lg" // เพิ่ม shadow ให้กับภาพ
      />
      <a href="#" className="text-4xl font-extrabold text-blue-500 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        SIMP คุณอาเรียโต๊ะข้างๆพูดรัสเซียหวานใส่ซะหัวใจจะวาย STORE
      </a>
    </div>
    <div className="flex items-center">
      <div className="relative mx-4 lg:mx-0 hidden lg:block">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </span>
        <Input
          className="w-full border rounded-md pl-10 pr-4 py-2"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="ghost" className="flex items-center">
        <Heart className="h-6 w-6 text-gray-600" />
      </Button>
      <Button variant="ghost" className="flex items-center ml-4">
        <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
        <span className="ml-2 text-sm font-medium text-gray-700">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </Button>
    </div>
  </div>
</nav>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
  <h1 className="text-4xl font-extrabold text-white mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-md shadow-lg">
    รายการสินค้าทั้งหมด
  </h1>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {filteredProducts.map(product => (
      <div 
        key={product.id} 
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
          <p className="text-gray-500">${product.price.toFixed(2)}</p>
          <Button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-2 rounded-md shadow-md hover:shadow-lg transition-all"
            onClick={() => addToCart(product)}
          >
            เพิ่มลงในตะกร้า
          </Button>
        </div>
      </div>
    ))}
  </div>  
        {/* Cart */}
<div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">รถเข็นของคุณ</h2>
  <ul className="divide-y divide-gray-200">
    {cart.map(item => (
      <li key={item.id} className="flex justify-between items-center py-2">
        <div>
          <span>{item.name}</span> <span className="text-gray-500">x {item.quantity}</span>
        </div>
        <div className="flex items-center">
          <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="mr-2">
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="mr-2">
            <Plus className="h-4 w-4" />
          </Button>
          <Button onClick={() => removeFromCart(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </li>
    ))}
  </ul>
  {cart.length > 0 && (
    <div className="mt-4">
      <div className="flex justify-between">
        <span>รายการสินค้า:</span>
        <span>{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>ค่าขนส่ง:</span>
        <span>{shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>ส่วนลด:</span>
        <span>{discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>รวมทั้งหมด:</span>
        <span>{total.toFixed(2)}</span>
      </div>
    </div>
  )}
</div>
        {/* Coupon */}
        <div className="mt-6">
          <Input
            className="w-full border rounded-md pl-4 pr-10 py-2"
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button onClick={applyCoupon} className="mt-2">ใช้โค้ดส่วนลด</Button>
        </div>
      </div>
    </div>
  );
}
