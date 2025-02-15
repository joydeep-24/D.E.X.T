import { useState, useEffect } from "react";
import "./App.css";
// import abi from "";
import { ethers } from "ethers";
import BuyE from "./components/BuyE";
import DepositE from "./components/DepositE";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import SellE from "./components/SellE";
import SellCard from "./components/SellCard";

function App() {
  const initialCards = [
    {
      oid: "123",
      units: 10,
      ppunits: 1,
    },
    {
      oid: "456",
      units: 20,
      ppunits: 0.5,
    },
    {
      oid: "789",
      units: 12,
      ppunits: 2,
    },
    {
      oid: "135",
      units: 14,
      ppunits: 3,
    },
    {
      oid: "135",
      units: 14,
      ppunits: 3,
    },
    {
      oid: "135",
      units: 14,
      ppunits: 3,
    },
    {
      oid: "135",
      units: 14,
      ppunits: 3,
    },
  ];

  const [cards, setCards] = useState(initialCards);

  const handleNewCard = (orderid, units, ppunits) => {
    const newCards = [...cards, { oid: orderid, units, ppunits }];
    setCards(newCards);
  };

  const handleRemoveCard = (orderid) => {
    const newCards = cards.filter((card) => card.oid !== orderid);
    setCards(newCards);
  };

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "prod",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "units",
              type: "uint256",
            },
          ],
          name: "EnergyDeposited",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "buyer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "units",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          name: "ExecutedTrade",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "prod",
              type: "address",
            },
          ],
          name: "ProsumerRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdrawal",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "prod",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "units",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "price_per_unit",
              type: "uint256",
            },
          ],
          name: "sellOnList",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_order_id",
              type: "uint256",
            },
          ],
          name: "buyEnergy",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_units",
              type: "uint256",
            },
          ],
          name: "depositEnergy",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getContractBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getEnergyBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getEtherBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "place_order",
          outputs: [
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "unit_amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price_per_unit",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "active",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "registerProsumer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_order_id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_units",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_price_per_unit",
              type: "uint256",
            },
          ],
          name: "sellEnergy",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      try {
        const { ethereum } = window;
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const provider = new ethers.providers.JsonRpcProvider(
          "http://127.0.0.1:8545"
        );

        // For writing on the blockchain
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });

        // Listen for account changes
        const handleAccountsChanged = async (accounts) => {
          setAccount(accounts[0]);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract });
        };

        // Listen for chain changes
        const handleChainChanged = () => {
          window.location.reload();
        };

        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);

        return () => {
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("chainChanged", handleChainChanged);
        };
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        alert(error.message);
      }
    };
    template();
  }, []);

  return (
    <div>
      <center>
        <NavBar contract={state.contract} />
        <NavBar2 contract={state.contract} />
        <h1>Connected Account: {account}</h1>
        <div className="outerbuycontainer">
          <BuyE contract={state.contract} onRemoveCard={handleRemoveCard} />
          <DepositE contract={state.contract} />
          <SellE contract={state.contract} onNewCard={handleNewCard} />
        </div>
      </center>
      <br />
      <center>
        <h1>Orders available to Buy</h1>
      </center>
      <div className="card-container">
        {cards.map((card, index) => (
          <SellCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
