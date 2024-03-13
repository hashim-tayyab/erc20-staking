import Head from 'next/head';
import contractABI from '../abi/abi.json';
import { useEffect, useState } from 'react';
const { ethers } = require('ethers');
import GetterButton from './getterButton/GetterButton';
import { ConnectWallet } from "@thirdweb-dev/react";
import InputBox from './inputBox/InputBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMetaMask } from "metamask-react";



// Sepolia Contract Address
const contractAddress = '0xEc1630C8a8400244F85f6A09861cbe9245b288BC';


export default function Home() {

    const addAmountAlert = () => toast.error("Add amount to Stake!");
    const unableToUnstake = () => toast.error("No amount to Unstake!");
    const stakingTimeNotUp = () => toast.error("You need to Wait before Unstaking!");
    const addAddressFirst = () => toast.error("Enter Address to Search!");
    const addUnstakeAmountAlert = () => toast.error("Enter Amount to Unstake First!");
    const noReward = () => toast.error("No Reward Pending!");



    const { switchChain } = useMetaMask();

    const [contract, setContract] = useState('');

    const [user, setUser] = useState('');
    const [balance, setBalance] = useState();
    const [stakedBalance, setStakedBalance] = useState();
    const [rewardBalance, setRewardBalance] = useState();
    const [withdrawn, setWithdrawn] = useState();




    const [amountToStake, setAmountToStake] = useState('');
    const [amountToUnstake, setAmountToUnstake] = useState('');
    const [chainId, setChainId] = useState('');




    useEffect(() => {



        const load = async () => {
            // Connect to sepolia
            // const provider = new ethers.BrowserProvider(window.ethereum);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, contractABI, signer);





            const { chainId } = await provider.getNetwork();
            setChainId(chainId);
            setContract(contract);
        }
        load();
    }, []);


    useEffect(() => {
        // Function to handle chain ID change
        const handleChainChange = () => {
          // Controlled reload (avoid unnecessary reloads)
          window.location.reload();
        };
    
        // Add event listener for chain changes (using MetaMask)
        window.ethereum?.on('chainChanged', handleChainChange);
    
        // Cleanup function to remove listener on unmount
        return () => window.ethereum?.removeListener('chainChanged', handleChainChange);
      }, []);
    


    if(11155111 !== chainId){
        return (
            <div className=' justify-center flex content-center items-center'>
                <GetterButton onClick={() => {switchChain("0xaa36a7")}}
                text={'Click here to Switch to Sepolia Testnet'}/>
            </div>
        )}



    


    const getBalance = async () => {
        if(user)
        {
        const balance = await contract.balanceOf(user);
        // console.log("Balance:", balance / 10 ** 18);
        setBalance(balance / 10 ** 18);
        }
        else{
            addAddressFirst();
        }
    }

    const stakeAmount = async () => {
        if(amountToStake > 0){
            await contract.Stake(BigInt(amountToStake * 10 ** 18));
        }
        else{
            addAmountAlert();
        }
    }

    const claimReward = async () => {
        try {
            await contract.claim();
        } catch (error) {
            noReward();
        }
    }

    const unstakeAmount = async () => {
        if(amountToUnstake > 0){
            try {
                await contract.unStake(BigInt(amountToUnstake * 10 ** 18));            
            } catch (error) {
                unableToUnstake();
            }
        }
        else {
            addUnstakeAmountAlert();
        }
    }

    const amountStaked = async () => {
        const staked = await contract.AmountStaked();
        setStakedBalance(staked / (10 ** 18));
    }

    const checkReward = async () => {
        const myReward = await contract.CheckReward();
        setRewardBalance(myReward/(10 ** 18));
    }

    const withdrawStatus = async () => {
        const status = await contract.WithdrawlStatus();
        setWithdrawn(status);
    }

    return (

        <div className="h-[100vh] bg-slate-700">



            <ToastContainer />   

            <Head>
                <title>Super Token</title>
            </Head>

            <div className='float-end'>
                <ConnectWallet style={{height:'5rem', marginTop: '10px', marginRight: '50px'}} />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-4xl font-bold text-center text-white'>Super Token Staking</h1>
            </div>

            <div className="flex justify-center items-center h-screen">
                <div className="text-[14px] text-center mt-2 lg:max-h-fit sm:max-h-[70vh] p-[3rem] pb-1 m-2
                        sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3 
                        bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-6 py-4">
                        <InputBox
                            label={"Enter Amount to Stake:"}
                            onChange={(e) => setAmountToStake(e.target.value)}
                            value={amountToStake}
                            placeholder={"Enter Amount"}
                        />
                        <GetterButton text={"Stake"} onClick={stakeAmount} />


                        <InputBox
                            label={"Enter Amount to Unstake:"}
                            onChange={(e) => setAmountToUnstake(e.target.value)}
                            value={amountToUnstake}
                            placeholder={"Enter Amount"}
                        />
                        <GetterButton text={"Unstake"} onClick={unstakeAmount} />


                        <InputBox
                            label={"Check Balance Of:"}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            placeholder={"Enter Address"}
                        />
                        <div className=' flex justify-center items-center'>
                            <GetterButton text={"Get User Balance"} onClick={getBalance} />
                            <div className='text-white'>User Balance: {balance}</div>
                        </div>
                    <div className='flex items-center justify-center mt-1' >
                        <div>
                            <div>
                                <GetterButton text={"Amount Staked"} onClick={amountStaked} />
                            </div>
                            <div className='text-white'>
                                {stakedBalance}
                            </div>
                        </div>

                        <div>
                            <div>
                                <GetterButton text={"Check Reward"} onClick={checkReward} />
                            </div>
                            <div className='text-white'>
                                {rewardBalance}
                            </div>
                        </div>

                        <div>
                            <div>
                                <GetterButton text={"Claim Reward"} onClick={claimReward} />
                            </div>
                            <div className='text-white'>
                                {withdrawn}
                            </div>
                        </div>
                    </div>
                    </div>

                </div>

            </div>

            {/* <GetterButton text={"Owner Address"} onClick={getOwnerAddress}/> */}
        </div>
    );
}