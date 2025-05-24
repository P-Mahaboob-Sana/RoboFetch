import React from "react";
import "./Cart.css";
import medicine1 from "../../assets/cefixime.png";
import medicine2 from "../../assets/saridon.png";
import medicine3 from "../../assets/dolo.png";
import medicine4 from "../../assets/neurobion.png";
import medicine5 from "../../assets/amlodipine.png";
import medicine6 from "../../assets/digene.png";
import medicine7 from "../../assets/crocin.png";
import medicine8 from "../../assets/zinc.png";
import medicine9 from "../../assets/moov.png";

const medicineList = [
  { image: medicine1, name: "Ofloxacin Tablets", price: 84.0, position: "A1" },
  { image: medicine2, name: "Saridon 50mg", price: 46.5, position: "A2" },
  {
    image: medicine3,
    name: "Paracetamol Dolo-650mg",
    price: 25.0,
    position: "A3",
  },
  { image: medicine4, name: "Neurobion Forte", price: 45.5, position: "A4" },
  {
    image: medicine5,
    name: "Amlodipine Tablets-5mg",
    price: 150.0,
    position: "B1",
  },
  { image: medicine6, name: "Digene 15mg", price: 50.0, position: "B2" },
  {
    image: medicine7,
    name: "Crocin Advance-500mg",
    price: 27.0,
    position: "B3",
  },
  { image: medicine8, name: "Zinc Oral Solution", price: 85.0, position: "B4" },
  {
    image: medicine9,
    name: "Moov Pain Relief spray",
    price: 135.0,
    position: "C1",
  },
];

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart from localStorage:", cart);

 
  const cartWithDetails = cart.map((cartItem) => {
  const medicine = medicineList.find((m) => m.name === cartItem.name);
  console.log("Matching cart item:", cartItem.name, "->", medicine); // <-- Add this
  return {
    ...cartItem,
    image: medicine?.image || "",
    price: medicine?.price || 0,
    position: medicine?.position || "Unknown",
  };
});


  const totalAmount = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateCartStorage = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload(); // to refresh UI
  };

  const increaseQuantity = (name) => {
    const updated = cartWithDetails.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartStorage(updated);
  };

  const decreaseQuantity = (name) => {
    const updated = cartWithDetails.map((item) =>
      item.name === name && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartStorage(updated);
  };

  const removeItem = (name) => {
    const updated = cartWithDetails.filter((item) => item.name !== name);
    updateCartStorage(updated);
  };

  const buySingleItem = (name) => {
    alert(`Thank you for buying ${name}!`);
    const updated = cartWithDetails.filter((item) => item.name !== name);
    updateCartStorage(updated);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartWithDetails.map((item, index) => (
          <div key={index} className="cart-box">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-info">
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>
                <strong>Position: {item.position || "Unknown"}</strong>
              </p>
              <p>Quantity: {item.quantity}</p>

              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>

              <div className="cart-actions">
                <button onClick={() => decreaseQuantity(item.name)}>-</button>
                <button onClick={() => increaseQuantity(item.name)}>+</button>
                <button onClick={() => removeItem(item.name)}>Remove</button>
                <button
                  className="buy-now-button"
                  onClick={() => buySingleItem(item.name)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {cartWithDetails.length > 0 && (
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      )}
    </div>
  );
};

export default Cart;
