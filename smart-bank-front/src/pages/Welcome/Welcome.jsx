import React from "react";
import ButtonConnect from "../../components/ButtonConnect/ButtonConnect";
import SmartBankLogo from "../../assets/LogoBg.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router";

export const Welcome = () => {
  return (
    <div className="welcome">
      <div className="flex flex-col content-center p-1 self-center">
        <img className="w-40 self-center" src={SmartBankLogo}></img>
        <p className="text-xl pb-2">Bienvenido a </p>
        <p className="m-0 font-bold text-3xl tracking-widest ">SMART BANK</p>
        <div className="mt-8">
          <p>Tu banco descentralizado para </p>
          <p>gestionar Ether de forma segura.</p>
        </div>
        <p className="mt-4 mb-2">Connecta tu wallet para comenzar.</p>
      </div>
      <ButtonConnect title={"Conecta tu billetera"}></ButtonConnect>
      <Link to="/dashboard">
        <div className="flex justify-center gap-2 mt-4 cursor-pointer text-white">
          <p className="font-bold"> Continuar sin conectar</p>
          <ArrowForwardIcon></ArrowForwardIcon>
        </div>
      </Link>
      <div className="disclaimer text-center p-3 text-sm text-red-300 ">
        <strong>Entorno de test</strong>
        <br></br> Esta plataforma funciona en la red de pruebas Sepolia. Todas
        las transacciones utilizan ETH de prueba sin valor real.
      </div>
    </div>
  );
};

export default Welcome;
