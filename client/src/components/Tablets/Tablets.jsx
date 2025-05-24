import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tablets.css";
import MedicineModal from "./Description.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
  { image: medicine3, name: "Paracetamol Dolo-650mg", price: 25.0, position: "A3" },
  { image: medicine4, name: "Neurobion Forte", price: 45.5, position: "A4" },
  { image: medicine5, name: "Amlodipine Tablets-5mg", price: 150.0, position: "B1" },
  { image: medicine6, name: "Digene 15mg", price: 50.0, position: "B2" },
  { image: medicine7, name: "Crocin Advance-500mg", price: 27.0, position: "B3" },
  { image: medicine8, name: "Zinc Oral Solution", price: 85.0, position: "B4" },
  { image: medicine9, name: "Moov Pain Relief spray", price: 135.0, position: "C1" },
];

const Tablets = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  const addToCart = (medicine) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.name === medicine.name);
      if (existingItemIndex !== -1) {
        // Increment quantity immutably
        return prevItems.map((item, idx) =>
          idx === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...medicine, quantity: 1 }];
      }
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Calculate total quantity of all items in cart
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
<button
  onClick={() => navigate("/cart")}
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1001,
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  View Cart ({totalQuantity})
</button>

      <div className="box-background">
        {medicineList.map((med, index) => (
          <div
            className="main-box"
            key={index}
            onClick={() => handleCardClick(med)}
            style={{ cursor: "pointer" }}
          >
            <h4>35% OFF</h4>
            <div className="image-background">
              <img className="image" src={med.image} alt={med.name} />
            </div>
            <h3
              className="medicine-name"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {med.name}
            </h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FontAwesomeIcon icon={faStar} color="green" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgb(240, 237, 244)",
                  height: "30px",
                  width: "90px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  justifyContent: "center",
                  gap: "5px",
                  marginLeft:"50px"
                }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  addToCart(med);
                }}
              >
                <FontAwesomeIcon icon={faCartShopping} color="black" size="lg"  />
                <h5 style={{ margin: 0 }}>{` (${med.price.toFixed(2)})`}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Description Modal */}
      
      <MedicineModal
  show={!!selectedMedicine}
  onClose={handleCloseModal}
  medicine={selectedMedicine}
  addToCart={addToCart}
/>

      {/* Toast Popup */}
      

{showToast && (
  <div className={`toast ${showToast ? "show" : ""}`}>
    Item added to cart successfully!
  </div>
)}
    </>
  );
};

export default Tablets;
