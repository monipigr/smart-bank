import { useState } from "react";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import { depositEther, withdrawEther } from "../../provider";
import TransactionInput from "../TransactionInput/TransactionInput";

export const DepositWithdrawCard = () => {
  const [toggle, setToggle] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const handleToggleDeposit = () => {
    setToggle("deposit");
  };

  const handleToggleWithdraw = () => {
    setToggle("withdraw");
  };

  const handleDepositEther = async () => {
    try {
      await depositEther(amount);
      setTransactionStatus({
        success: true,
        message: `Transacción de ${amount} ETH realizada con éxito`,
      });
    } catch (error) {
      setTransactionStatus({
        error: true,
        message: `${error}`,
      });
    }
    setTimeout(() => {
      setTransactionStatus({
        success: false,
        error: false,
        message: "",
      });
      setAmount("");
    }, 5000);
  };

  const handleWithdrawEther = async () => {
    try {
      await withdrawEther(amount);
      setTransactionStatus({
        success: true,
        message: `Transacción de ${amount} ETH realizada con éxito`,
      });
    } catch (error) {
      setTransactionStatus({
        error: true,
        message: `${error}`,
      });
    }
    setTimeout(() => {
      setTransactionStatus({
        success: false,
        error: false,
        message: "",
      });
      setAmount("");
    }, 5000);
  };

  return (
    <div className="card balance">
      <div className="title">
        <p className="text-2xl">Depósitos y Retiros</p>
      </div>

      <p className="text-sm font-semibold text-zinc-400 mt-1">
        Gestiona tus fondos de manera segura en SmartBank
      </p>

      <div className="tab mt-5">
        <div
          className={`deposit ${toggle === "deposit" ? "active" : "no-active"}`}
          onClick={handleToggleDeposit}
        >
          <VerticalAlignBottomOutlinedIcon
            sx={{ marginRight: "8px" }}
          ></VerticalAlignBottomOutlinedIcon>
          Depositar
        </div>
        <div
          className={`withdraw ${
            toggle === "withdraw" ? "active" : "no-active"
          }`}
          onClick={handleToggleWithdraw}
        >
          <UpgradeOutlinedIcon
            sx={{ marginRight: "8px" }}
          ></UpgradeOutlinedIcon>
          Retirar
        </div>
      </div>

      <div className="info-detail mt-2">
        {toggle === "deposit" ? (
          <TransactionInput
            transactionStatus={transactionStatus}
            handleDepositEther={handleDepositEther}
            amount={amount}
            setAmount={setAmount}
            title={"Cantidad a depositar"}
            textButton={"Depositar ETH"}
            icon={VerticalAlignBottomOutlinedIcon}
          ></TransactionInput>
        ) : (
          <TransactionInput
            transactionStatus={transactionStatus}
            handleDepositEther={handleWithdrawEther}
            amount={amount}
            setAmount={setAmount}
            title={"Cantidad a retirar"}
            textButton={"Retirar ETH"}
            icon={UpgradeOutlinedIcon}
          ></TransactionInput>
        )}

        <p className="text-sm font-semibold text-zinc-400 mt-5">
          Todas las transacciones están registradas en la blockchain de{" "}
          <a
            href="https://sepolia.arbiscan.io/address/0xc08ba5c29763cc58c4edd6cce99be1b401d5390a"
            target="_blank"
            className="text-blue-300 hover:underline"
          >
            Arbiscan Sepolia
          </a>
        </p>
      </div>
    </div>
  );
};

export default DepositWithdrawCard;
