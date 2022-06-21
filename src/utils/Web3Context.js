import React from "react";

const Web3Context = React.createContext();

export const Web3ContextProvider = (props) => {
  const [value, setValue] = React.useState(null);

  return (
    <Web3Context.Provider value={{ value, setValue }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export const Web3ContextConsumer = Web3Context.Consumer;
export default Web3Context;
