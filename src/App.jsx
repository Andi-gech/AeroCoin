import { useCallback, useEffect, useState } from 'react';

import './App.css';

import { AiOutlineInfoCircle, AiOutlineRocket, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { FcFlashOn, FcTouchscreenSmartphone } from 'react-icons/fc';
import rocket from './assets/rocket.png';
import { MdOutlineFlashOn, MdOutlineTask, MdOutlineTouchApp } from 'react-icons/md';
import { CiCoinInsert } from 'react-icons/ci';
import { retrieveLaunchParams } from '@tma.js/sdk';
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const {initDataRaw,initData}= retrieveLaunchParams();
  const [isErorr, setIsErorr] = useState(false);
  const [isSucess, setIsSucess] = useState(false);


  
 const sendRequest = () => {

    axios.get(`https://aero-coin-api.vercel.app/onclicks/${count}`,{
      headers: {
        Authorization:`tma ${initDataRaw}`
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error sending request:', error);
      });
  };
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  
  },[])
 

  const params = new URLSearchParams(initDataRaw);
  const userData = JSON.parse(decodeURIComponent(params.get('user') || '{}'));
  const avatar = useMemo(() => {
    return createAvatar(bottts, {
      size: 128,
      // ... other options
    }).toDataUriSync();
  }, []);

  useEffect(async() => {
    if (!initData) {
      setIsErorr(true);
      return;
    }
    await axios
      .get('https://aero-coin-api.vercel.app/', {
        headers: {
        Authorization:`tma ${initDataRaw}`
        },
      })
      .then((res) => {
      console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [initDataRaw]);

  return (
    <div className='relative flex  min-h-screen w-screen  flex-col   justify-evenly items-center  bg-zinc-900'>
      <div className='w-full  px-3 shadow-sm shadow-gray-800 h-[60px] flex flex-row items-center justify-between mt-[10px]'>
        <div className='flex flex-row items-center justify-center'>
        <img src={avatar} alt='logo' className='h-[50px] w-[50px] rounded-full border-[2px] border-yellow-400' />
        <div className='h-full flex-col mx-2 items-center justify-center'>
          <p className='text-md font-bold text-yellow-300'>@{userData?.username}</p>
          <p className='text-xs text-gray-400'>Newid: {userData?.id}</p>
        </div>
        </div>
        <AiOutlineInfoCircle className='h-[20px] w-[20px] text-white' />
      </div>
      {isErorr && <p className='text-red-500'>Error</p>}
      {isSucess && <p className='text-green-500'>{isSucess[0]}</p>}
      

      <div className='flex w-full h-[50px]  mt-[10px] flex-row items-center justify-center'>
        <FaCoins className='h-[20px] w-[20px] text-white' />
        <p className='text-3xl font-bold ml-[20px] text-white'>{count}</p>
        </div>
      

      <div
        className='w-[200px] h-[200px] mt-[10px] active:scale-[1.05] transform transition duration-300 shadow-yellow-700 bg-yellow-400 rounded-full flex flex-row items-center justify-center'
        onClick={handleIncrement}
      >
        <div className='w-[180px] h-[180px] flex items-center flex-col justify-center bg-blend-color-burn rounded-full bg-gradient-to-r from-amber-500 to-amber-600'>
          <p className='text-6xl font-bold    bg-blend-darken opacity-20 '>AERO</p>
          
        
        </div>
       
      
      </div>
      <div className='w-full flex flex-row items-center mt-5  justify-center'>
      <div className='w-[76%] rounded-full h-[15px] bg-white '></div>
      <div className='flex flex-row'>
      <FcFlashOn className='w-[25px] h-[25px] text-yellow-400  ' />
      <p className='text-white'>5000</p>
      </div>
     
     
      </div>
      <div className='w-[80%] flex flex-row  justify-between my-[20px]   h-[1px]'><p className='text-white text-sm'>timer</p>
      <p className='text-white text-sm'>23:45</p></div>
      <div className='w-[80%] flex flex-row justify-between px-5 mt-3  h-[100px]'>
        <div className='w-[70px] opacity-25 ml-2 h-[85px] bg-zinc-800  bg-opacity-25 flex  flex-col items-center justify-center border-[1px] rounded-md  border-green-500'>
          <AiOutlineRocket className='w-[40px] h-[40px]  text-white'/>
          <p className='text-white'>Boost</p>
        </div>
        <div className='w-[70px] opacity-25 ml-2 h-[85px] bg-zinc-800  flex flex-col items-center justify-center bg-opacity-25 border-[1px] rounded-md  border-zinc-500'>
          <MdOutlineTouchApp className='w-[40px] h-[40px]  text-white'/>
          <p className='text-white'>Tap Bot</p>
        </div>
        <div className='w-[70px]  opacity-25 ml-2 h-[85px] bg-zinc-800  flex flex-col items-center justify-center bg-opacity-25 border-[1px] rounded-md  border-zinc-500'>
          <MdOutlineFlashOn className='w-[40px] h-[40px]  text-white'/>
          <p className='text-white'>Energy</p>
        </div>
      </div>
      <div className='w-full  border-t-[1px] border-gray-800 pt-3 flex flex-row justify-between px-5   h-[60px] justify-self-end '>
        <div className=' flex-1   h-full   flex flex-col items-center justify-center bg-opacity-25  rounded-md  '>
          <AiOutlineUsergroupAdd className='w-[30px] h-[30px]  text-white'/>
          <p className='text-white text-[13px]'>Invite</p>
        </div>
        <div className=' flex-1   h-full   flex flex-col items-center justify-center bg-opacity-25  rounded-md  '>
          <CiCoinInsert className='w-[30px] h-[30px]  text-white'/>
          <p className='text-white text-[13px]'>Mine</p>
        </div>
        <div className=' flex-1   h-full   flex flex-col items-center justify-center bg-opacity-25  rounded-md  '>
          <MdOutlineTask className='w-[30px] h-[30px]  text-white'/>
          <p className='text-white text-[13px]'>Task</p>
        </div>
      </div>
      
    
    </div>
  );
}

export default App;
