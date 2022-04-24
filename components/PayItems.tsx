import config from 'config';
import React, { useEffect } from 'react';
import { Methods } from "@tosspayments/brandpay-types"
import CardMethodPayItem from './CardMethodPayItem';
import AccountMethodPayItem from './AccountMethodPayItem';
interface PayItemTypes {
    method: Methods;
}
const PayItems: React.FC<PayItemTypes> = ({method}) => {
  return (
    <>
    {method.accounts.length === 0 && method.cards.length === 0 && "등록된 결제수단이 없습니다."}
      {method.accounts.map((account, index) => (
          <>
            <AccountMethodPayItem method={account} key={index}/>
          </>
      ))}
      {method.cards.map((card, index) => (
          <>
            <CardMethodPayItem method={card} key={index}/>
          </>
      ))}
    </>
  );
};

export default PayItems;