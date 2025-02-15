import React, { useState } from "react";
import styles from "./NavBar2.module.css";

export default function NavBar2({ contract }) {
  const [balances, setBalances] = useState({
    energyBalance: null,
    accountBalance: null,
    contractBalance: null,
  });

  const eBal = async (event) => {
    event.preventDefault();
    try {
      const balance = await contract.getEnergyBalance();
      setBalances((prevBalances) => ({
        ...prevBalances,
        energyBalance: balance.toString(),
      }));
    } catch (error) {
      console.error("Error fetching Energy Balance:", error);
    }
  };

  const accBal = async (event) => {
    event.preventDefault();
    try {
      const balance = await contract.getEtherBalance(); // Assuming this function retrieves account balance in ETH
      setBalances((prevBalances) => ({
        ...prevBalances,
        accountBalance: balance.toString(),
      }));
    } catch (error) {
      console.error("Error fetching Account Balance:", error);
    }
  };

  const conBal = async (event) => {
    event.preventDefault();
    try {
      const balance = await contract.getContractBalance();
      setBalances((prevBalances) => ({
        ...prevBalances,
        contractBalance: balance.toString(),
      }));
    } catch (error) {
      console.error("Error fetching Contract Balance:", error);
    }
  };

  return (
    <div className={styles.buttoncontainer}>
      <button className={styles.button} onClick={eBal}>
        {balances.energyBalance
          ? `Energy Balance: ${balances.energyBalance} units`
          : "Energy Balance"}
      </button>
      <button className={styles.button} onClick={accBal}>
        {balances.accountBalance
          ? `Account Balance: ${balances.accountBalance} ETH`
          : "Account Balance"}
      </button>
      <button className={styles.button} onClick={conBal}>
        {balances.contractBalance
          ? `Contract Balance: ${balances.contractBalance} ETH`
          : "Contract Balance"}
      </button>
    </div>
  );
}
