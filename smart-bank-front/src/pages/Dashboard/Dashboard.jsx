import React from "react";
import { Link } from "react-router";
import InfoCard from "../../components/InfoCard/InfoCard";
import SmartBankLogo from "../../assets/LogoBg.png";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import DepositWithdrawCard from "../../components/DepositWithdrawCard/DepositWithdrawCard";
import UserBalance from "../../components/UserBalance/UserBalance";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Link to="/" className="header">
        <img className="w-16" src={SmartBankLogo}></img>
        <p className="text-xl font-bold">Smart Bank</p>
      </Link>
      <UserBalance></UserBalance>
      <DepositWithdrawCard></DepositWithdrawCard>
      <BalanceCard></BalanceCard>
      <InfoCard></InfoCard>
    </div>
  );
};

export default Dashboard;
