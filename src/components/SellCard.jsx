import React from "react";

function SellCard({ card }) {
  const cardStyle = {
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "30px",
    width: "18rem",
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-header">Order Details</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{`OrderID: ${card.oid}`}</li>
        <li className="list-group-item">{`Units: ${card.units}`}</li>
        <li className="list-group-item">{`Price per unit: ${card.ppunits}`}</li>
      </ul>
    </div>
  );
}

export default SellCard;
