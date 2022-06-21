import Connect from "./Connect";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Context from "../utils/Web3Context";

const HomePage = () => {
  const web3Context = useContext(Web3Context);
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [verifiedResponse, setVerifiedResponse] = useState({});

  const verify = async (tokenId) => {
    if (web3Context.value === null) {
      alert("Please login");
      return;
    }

    const { ethersProvider } = web3Context.value;
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();
    const message = `VerifyMessage_${address}`;
    const signature = await signer.signMessage(message);

    setMessage(message);
    setSignature(signature);

    const response = await axios.get(
      `/api/verifyMessage?address=${address}&signature=${signature}&message=${message}`
    );
    setVerifiedResponse(response.data);
  };

  const logout = async () => {
    await web3Context.value.web3auth.logout();
    web3Context.setValue(null);
  };

  return (
    <div>
      <Connect />
      <div className="px-2 py-4">
        {web3Context.value && (
          <>
            <pre>
              {web3Context?.value && (
                <div className="px-2 py-4">
                  <h1>Wallet Addr: {web3Context.value.accounts}</h1>
                  <h1>Balance: {web3Context.value.balance}</h1>
                  <div>
                    <pre>
                      <code>
                        {JSON.stringify(web3Context.value.userInfo, null, 2)}
                      </code>
                    </pre>
                  </div>
                  <h1>Message to sign: {message}</h1>
                  <h1>Signature: {signature}</h1>
                  <h1>
                    Verified Response:{" "}
                    {JSON.stringify(verifiedResponse, null, 2)}
                  </h1>
                </div>
              )}
            </pre>
            <div className="flex flex-col">
              <button
                className="px-2 py-4 font-bold border border-black my-1"
                onClick={verify}
              >
                Verify
              </button>
              <button
                className="px-2 py-4 font-bold border border-black my-1"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
