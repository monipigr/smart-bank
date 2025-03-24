import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getBalance,
  // subscribeDepositEvent,
  // subscribeWithdrawEvent,
} from "../../provider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const UserBalance = () => {
  const [balance, setBalance] = useState(0);
  const [etherPrice, setEtherPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBalance();
    getEtherPrice();

    // const unsubscribeWithdraw = subscribeWithdrawEvent((user, amount) => {
    //   console.log("Nuevo retiro: ", { user, amount });
    //   loadBalance();
    // });
    // const unsubscribeDeposit = subscribeDepositEvent((user, amount) => {
    //   console.log("Nuevo depósito", { user, amount });
    //   loadBalance();
    // });

    // return () => {
    //   unsubscribeDeposit();
    //   unsubscribeWithdraw();
    // };
  });

  const getEtherPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
      );
      const data = await response.json();
      const ether = data?.ethereum?.eur;
      setEtherPrice(ether);
    } catch (error) {
      setError("Fallo al obtener los datos");
      console.error(error);
    }
  };

  const loadBalance = async () => {
    try {
      const balance = await getBalance();
      setBalance(balance);
      return balance;
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <div className="w-fit m-auto">
      <p className="text-sm font-semibold text-zinc-400 text-left mt-5">
        Valor de tu cartera
      </p>
      <p className="text-3xl text-left">{balance} ETH</p>
      {!error ? (
        <p className="text-sm font-semibold text-zinc-400 text-left">
          {(balance * etherPrice).toFixed(2)} €
        </p>
      ) : (
        <div className="flex gap-1 items-center">
          <p className="text-sm font-semibold text-red-300 text-left">
            {error}
          </p>
          <Link to="/">
            <AccountBalanceWalletIcon
              sx={{ fontSize: "large", cursor: "pointer", color: "white" }}
            ></AccountBalanceWalletIcon>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserBalance;
