import React from "react";
import { Link } from "react-router";
import InfoCard from "../../components/InfoCard/InfoCard";
import SmartBankLogo from "../../assets/LogoBg.png";
import BalanceCard from "../../components/BalanceCard/BalanceCard";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Link to="/" className="header">
        <img className="w-16" src={SmartBankLogo}></img>
        <p className="text-xl font-bold">Smart Bank</p>
      </Link>
      <BalanceCard></BalanceCard>
      <InfoCard></InfoCard>
    </div>
  );
};

export default Dashboard;
