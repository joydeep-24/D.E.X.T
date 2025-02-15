import styles from "./BuyE.module.css";
export default function BuyE({ contract, onRemoveCard }) {
  const eBuy = async (event) => {
    event.preventDefault();
    try {
      const orderid = document.querySelector("#orderid").value;
      const buy = await contract.buyEnergy(orderid);
      await buy.wait();
      console.log(`Buy order placed for orderid: ${orderid}`);
      onRemoveCard(orderid);
    } catch (error) {
      console.error(`Error placing order:`, error);
    }
  };
  return (
    <>
      <div className={`${styles.outerbuycontainer}`}>
        <div className={`${styles.buycontainer}`}>
          <center>
            <h1>Buy Energy</h1>
            <form onSubmit={eBuy}>
              <div className={`${styles.inputcontainer}`}>
                <input type="text" id="input" required />
                <label htmlFor="input" className={`${styles.label}`}>
                  Enter Order ID
                </label>
                <div className={`${styles.underline}`}></div>
              </div>
              <button type="submit">Place Order</button>
            </form>
          </center>
        </div>
      </div>
    </>
  );
}
