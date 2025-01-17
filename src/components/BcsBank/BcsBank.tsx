import React, { useState, useEffect, useRef } from 'react';
import { FaPowerOff, FaRegUserCircle, FaDollarSign, FaHashtag } from "react-icons/fa";


const BcsBank: React.FC = () => {
  const [viewport, setViewport] = useState<'withdraw' | 'deposit' | 'transfer'>('withdraw');
  const nicknameRef = useRef<HTMLHeadingElement>(null);
  const accountIDRef = useRef<HTMLParagraphElement>(null);
  const bankBalanceRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Simulating data update with a custom event listener
    const updateBankData = (event: CustomEvent) => {
      const parsedData = event.detail;
      if (nicknameRef.current) nicknameRef.current.textContent = parsedData.name;
      if (accountIDRef.current) accountIDRef.current.textContent = parsedData.account_id;
      if (bankBalanceRef.current) bankBalanceRef.current.textContent = `$ ${parsedData.balance}`;
    };

    window.addEventListener('updateBankData', updateBankData as EventListener);

    return () => {
      window.removeEventListener('updateBankData', updateBankData as EventListener);
    };
  }, []);

  const handleClick = (view: 'withdraw' | 'deposit' | 'transfer') => {
     const audio = new Audio('./src/assets/sounds/click.mp3'); 
     audio.play();
    setViewport(view);
  };

  const closeBankUi = () => {
    const closeEvent = new CustomEvent('closeBankUi');
    window.dispatchEvent(closeEvent);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-[#121212] text-white rounded-[10px]">
      {/* NAVIGATION */}
      <header className="mb-6">
        <div className="bg-[#252525] p-4 rounded-[10px] flex items-center justify-between">
          <img src="./src/assets/images/BCSB.webp" alt="BCSB logo" className="w-40" />
          <ul className="flex space-x-8">
            <li>
              <button onClick={() => handleClick('withdraw')} className="hover:text-red-500">Withdraw</button>
            </li>
            <li>
              <button onClick={() => handleClick('deposit')} className="hover:text-red-500">Deposit</button>
            </li>
            <li>
              <button onClick={() => handleClick('transfer')} className="hover:text-red-500">Transfer</button>
            </li>
          </ul>
          <FaPowerOff className="text-gray-400 text-xl hover:text-red-500 cursor-pointer" onClick={closeBankUi}/>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="flex space-x-4">
        <div className="flex flex-col space-y-4">
          <div className="bg-[#252525] p-4 rounded-lg">
            <h4 className="flex items-center text-lg">
              <FaRegUserCircle className="mr-2" />
              <span ref={nicknameRef}>Pitix_Test</span>
            </h4>
            <p className='flex place-items-center gap-1'>Account: <FaHashtag /><span ref={accountIDRef}>11111</span></p>
          </div>
          <div className="bg-[#252525] p-4 rounded-[10px]">
            <h4>ACCOUNT BALANCE</h4>
            <p ref={bankBalanceRef}>$ 0</p>
          </div>
          <div className="bg-[#252525] p-4 rounded-[10px] text-center">
            <h5>Customer support</h5>
            <h6>1-800-DoNotCallUs</h6>
          </div>
        </div>

        <div className="flex-grow bg-[#252525] rounded-[10px] p-6 flex justify-center items-center">
          {viewport === 'deposit' && (
            <div className="space-y-4">
              <h4>DEPOSIT AMOUNT</h4>
              <div className="flex items-center bg-white p-2 rounded-[10px]">
                <FaDollarSign className="text-gray-500 mr-2" />
                <input type="number" className="w-full focus:outline-none text-[#252525]" />
              </div>
              <button className="bg-red-600 py-2 px-4 rounded-[10px] hover:bg-red-700">Submit</button>
            </div>
          )}
          {viewport === 'withdraw' && (
            <div className="space-y-4">
              <h4>WITHDRAW AMOUNT</h4>
              <div className="flex items-center bg-white p-2 rounded-[10px]">
                <FaDollarSign className="text-gray-500 mr-2" />
                <input type="number" className="w-full focus:outline-none text-[#252525]" required />
              </div>
              <button className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700">Submit</button>
            </div>
          )}
          {viewport === 'transfer' && (
            <div className="space-y-4">
              <h4>TRANSFER TO</h4>
              <div className="flex items-center bg-white p-2 rounded-[10px]">
                <FaHashtag className="text-gray-500 mr-2" />
                <input type="number" placeholder="Account Number" className="w-full focus:outline-none text-[#252525]" required />
              </div>
              <h4>AMOUNT</h4>
              <div className="flex items-center bg-white p-2 rounded-[10px]">
                <FaDollarSign className="text-gray-500 mr-2" />
                <input type="number" className="w-full focus:outline-none text-[#252525]" required />
              </div>
              <button className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700">Submit</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BcsBank;
