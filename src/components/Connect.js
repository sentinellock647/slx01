import React from "react";
import Web3Context from "../utils/Web3Context";
import { Web3Auth } from "@web3auth/web3auth";
import { ethers } from "ethers";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const Connect = () => {
  const web3Context = React.useContext(Web3Context);

  const connectWallet = async () => {
    try {
      const chainId = 80001;
      const clientId =
        "BDrOm7jA9wnSUgc_gTUQu2_4O1Vn6DyKHhREA6QmxzU6yF-RTS7SvBh67hpvqPrRERVRSySY2vcC1U7qL5urWdI";
      const rpcTarget =
        "https://polygon-mumbai.infura.io/v3/ee989c7e98d1448ab018c2c4f83c00ca";
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: ethers.utils.hexValue(chainId),
          rpcTarget,
        },
      });
      await web3auth.initModal();
      const web3authProvider = await web3auth.connect();
      const userInfo = await web3auth.getUserInfo();
      const ethersProvider = new ethers.providers.Web3Provider(
        web3authProvider,
        { chainId }
      );

      const accounts = await ethersProvider.listAccounts();
      const balance = (await ethersProvider.getBalance(accounts[0])).toString();

      web3Context.setValue({
        web3authProvider,
        userInfo,
        web3auth,
        accounts,
        balance,
        ethersProvider,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!web3Context?.value && (
        <button
          className="px-2 py-4 font-bold border border-black"
          onClick={connectWallet}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Connect;
