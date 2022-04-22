import React from 'react';
import { CardMethod } from "@tosspayments/brandpay-types"
interface PayItemTypes {
    method: CardMethod
}

const PayItem: React.FC<PayItemTypes> = ({method}) => {
  return (
    <>
      <div className='flex flex-row items-center my-2 mx-2'>
        <img src={method.iconUrl} className="md:w-12 w-9"/>
        <div className='flex flex-col'>
          <span className='ml-2 text-lg'>{method.cardName}</span>
          <span className='ml-2 text-lg'>{method.cardNumber}</span>
        </div>
      </div>
    </>
  );
};

export default PayItem;