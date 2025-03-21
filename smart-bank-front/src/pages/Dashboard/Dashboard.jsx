import React from "react";
import { Link } from "react-router";
import InfoCard from "../../components/InfoCard/InfoCard";
import SmartBankLogo from "../../assets/LogoBg.png";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import DepositWithdrawCard from "../../components/DepositWithdrawCard/DepositWithdrawCard";
import UserBalance from "../../components/UserBalance/UserBalance";
import ButtonConnect from "../../components/ButtonConnect/ButtonConnect";

export const Dashboard = () => {
  const styles = {
    borderRadius: "8px",
    textTransform: "none",
    position: "absolute",
    top: "30px",
    right: "16px",
  };
  return (
    <div className="dashboard">
      <Link to="/" className="header">
        <img className="w-16" src={SmartBankLogo}></img>
        <p className="text-xl font-bold">Smart Bank</p>
      </Link>
      <ButtonConnect styles={styles} title={"Conectar"}></ButtonConnect>
      <UserBalance></UserBalance>
      <DepositWithdrawCard></DepositWithdrawCard>
      <BalanceCard></BalanceCard>
      <InfoCard></InfoCard>
    </div>
  );
};

export default Dashboard;
