import React, { useState, useEffect } from "react";

const CartPopup = ({ medicine, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(medicine.price);

  useEffect(() => {
    setTotalPrice((medicine.price * quantity).toFixed(2));
  }, [quantity, medicine.price]);

  // Handler for quantity change with scroll-wheel or manual input
  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    setQuantity(val);
  };

  const handleAddClick = () => {
    onAdd({ ...medicine, quantity });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: "20vw",
        height: "25vh",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>{medicine.name}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="quantity" style={{ fontWeight: "600" }}>
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
          style={{
            width: "100%",
            padding: "5px",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ fontWeight: "600", fontSize: "1.1rem", marginTop: "10px" }}>
        Total Price: ₹{totalPrice}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <button
          onClick={handleAddClick}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add
        </button>
        <button
          onClick={onClose}
          style={{
            marginLeft: "10px",
            backgroundColor: "#ccc",
            color: "black",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
