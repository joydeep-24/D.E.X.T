import { useState } from "react";
import styles from "./SellE.module.css";

export default function SellE({ contract, onNewCard }) {
  const eSell = async (event) => {
    event.preventDefault();
    try {
      const orderid = document.querySelector("#oid").value;
      const unit = document.querySelector("#units").value;
      const ppunit = document.querySelector("#ppunits").value;
      const sellOrder = await contract.sellEnergy(orderid, unit, ppunit);
      await sellOrder.wait(); // Wait for the transaction to be confirmed
      onNewCard(orderid, unit, ppunit);
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <div className={styles.buycontainer}>
      <center>
        <h1>Sell Energy</h1>
        <form onSubmit={eSell}>
          <div className={styles.inputcontainer}>
            <input type="text" id="oid" placeholder="OrderID" required />
            <div className={styles.underline}></div>
            <input type="text" id="units" placeholder="Units" required />
            <div className={styles.underline}></div>
            <input
              type="text"
              id="ppunits"
              placeholder="Price per Unit"
              required
            />
            <div className={styles.underline}></div>
          </div>
          <button type="submit">Place Order</button>
        </form>
      </center>
    </div>
  );
}
