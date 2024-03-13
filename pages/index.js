import React from 'react';
import Home from '../components/app';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { MetaMaskProvider } from "metamask-react";


const App = () => {
  const activeChainId = 11155111;
  return (
    <ThirdwebProvider desiredChainId = {activeChainId} >
      <MetaMaskProvider>
        <Home/>
      </MetaMaskProvider>
    </ThirdwebProvider>
  )
}

export default App