import styles from "./DepositE.module.css";
const DepositE = ({ contract }) => {
  const deposit = async (event) => {
    event.preventDefault();

    try {
      const units = document.querySelector("#Units").value;
      const finish = await contract.depositEnergy(units);
      await finish.wait();
      console.log(`Energy deposited: ${units}`);
    } catch (error) {
      console.error("Error Depositing:", error);
    }
  };

  return (
    <>
      <div className={`${styles.buycontainer}`}>
        <center>
          <h1>Deposit Energy</h1>
          <form onSubmit={deposit}>
            <div className={`${styles.inputcontainer}`}>
              <input type="text" id="Units" required />
              <label htmlFor="input" className={`${styles.label}`}>
                Enter Units
              </label>
              <div className={`${styles.underline}`}></div>
            </div>
            <button type="submit">Deposit</button>
          </form>
        </center>
      </div>
    </>
  );
};

export default DepositE;
