import {useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/js/Navbar";
import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";


function App() {
  const contractAddress = "0x62975aA00574Af26053CAdD71C9923B444891351";
  const [data, setdata] = useState({
    address: "-",
    balance: "-",
  });
  const [ETHtoPPC, setETHtoPPC] = useState(null);
  const [PPCtoETH, setPPCtoETH] = useState(null);
  const [isConnected, setIsConnected] = useState("Connect to Metamask");

  const handlerConnectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(contractAddress, erc20abi, provider);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const balance = await erc20.balanceOf(signerAddress);
      setdata({
        address: signerAddress,
        balance: String(balance + " PPC"),
      });
      setIsConnected("Connected");
    } else {
      alert("Install Metamask Please!!");
    }
  };

  window.ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractAddress, erc20abi, provider);
    const balance = await erc20.balanceOf(accounts[0]);
    console.log(balance);
    setdata({
      address: accounts,
      balance: String(balance + " PPC"),
    });
  });

  const handlerDeposit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);
    const amount = e.target.amount;
    await erc20.deposit({ value: ethers.utils.parseEther(amount.value) });
  };

  const handlerWithdraw = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);
    const amount = e.target.amount;
    await erc20.withdraw(amount.value);
  };

  const handlerTransfer = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);
    const amount = e.target.amount;
    const address = e.target.address;
    console.log(address);
    await erc20.transfer(address.value, amount.value);
  };

  const calculateETHtoPPC = (e) => {
    let valueETH = e.target.value;
    setETHtoPPC(
      `${valueETH.toLocaleString("en-US")} ETH = ${(
        valueETH * 10000
      ).toLocaleString("en-US")} PPC`
    );
  };

  const calculatePPCtoETH = (e) => {
    let valuePPC = e.target.value;
    setPPCtoETH(
      `${valuePPC.toLocaleString("en-US")} PPC = ${valuePPC / 10000} ETH`
    );
  };

  return (
    <div className="App container bg-light">
      <Navbar />
      <div class="card text-white bg-primary mb-2 ">
        <div class="card-body">
          <p className="fs-2"> Address: {data.address}</p>
          <p className="fs-2"> Balance: {data.balance} </p>
        </div>
      </div>

      <div className="d-flex flex-row  mb-4 justify-content-center">
        <div className="p-2 btn-group-lg">
          <button
            onClick={handlerConnectWallet}
            type="button"
            className="btn bg-warning "
          >
            {isConnected}
          </button>
        </div>
      </div>

      <div className="container bg-gradient ">
        <div className="row ">
          <div className="col-md-4 card text-white bg-success mx-auto ">
            <p className="fs-3 text-center">Deposit</p>
            <form onSubmit={handlerDeposit}>
              <div className="mb-2 ">
                <label className="form-label text-center">
                  Deposit ETH to PPC : 1 ETH = 10,000 PPC
                </label>
                <br />
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  step="0.0001"
                  min="0.0001"
                  onChange={calculateETHtoPPC}
                />
                <div className="form-text text-light ">{ETHtoPPC}</div>
              </div>

              <div class="d-grid gap-2 col-6 mx-auto my-3">
                <button type="submit" className="btn btn-light">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-4  card text-white bg-danger mx-auto ">
            <p className="fs-3 text-center">Withdraw</p>
            <form onSubmit={handlerWithdraw}>
              <div className="mb-2">
                <label className="form-label text-center">
                  Withdraw PPC to ETH : 1 PPC = 0.0001 ETH
                </label>
                <br />
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  step="1"
                  min="1"
                  onChange={calculatePPCtoETH}
                />
                <div className="form-text text-light">{PPCtoETH}</div>
              </div>

              <div class="d-grid gap-2 col-6 mx-auto my-3">
                <button type="submit" className="btn btn-light">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 card text-white bg-dark mx-auto ">
            <p className="fs-3 text-center">Transfer</p>
            <form onSubmit={handlerTransfer}>
              <div className="mb-2">
                <label className="form-label text-center">Address</label>
                <input type="text" className="form-control" name="address" />
              </div>
              <div className="mb-2 ">
                <label className="form-label text-center">Amont (PCC)</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  step="1"
                  min="1"
                />
              </div>
              <div class="d-grid gap-2 col-6 mx-auto my-3">
                <button type="submit" className="btn btn-light">
                  Submit
                </button>
              </div>
             

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
