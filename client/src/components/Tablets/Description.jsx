
import React from "react";
import "./Description.css"; // We'll create this for modal styles
const MedicineModal = ({ show, onClose, medicine, addToCart }) => {
  if (!show || !medicine) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-body">
          <div className="modal-left">
            <img src={medicine.image} alt={medicine.name} className="modal-image" />
            <h2>{medicine.name}</h2>
          </div>

          <div className="modal-right">
            <h3>Specifications:</h3>
            <ul>
              {medicine.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add to Cart button */}
        <div className="modal-footer">
          <button
            className="add-to-cart-btn"
            onClick={() => {
              addToCart(medicine);
              onClose(); // Optionally close the modal after adding to cart
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
