import React from 'react';
import Home from '../components/app';
import { ThirdwebProvider } from "@thirdweb-dev/react";


const App = () => {
  const activeChainId = 11155111;
  return (
    <ThirdwebProvider desiredChainId = {activeChainId} >
      <Home/>
    </ThirdwebProvider>
  )
}

export default App