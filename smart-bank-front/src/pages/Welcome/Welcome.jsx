import React from "react";
import ButtonConnect from "../../components/ButtonConnect/ButtonConnect";
import SmartBankLogo from "../../assets/LogoBg.png";

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
    </div>
  );
};

export default Welcome;
