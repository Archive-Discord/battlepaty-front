import { PaymentsGuildSetting } from '@types';
import React, { useEffect } from 'react';
import { Methods } from "@tosspayments/brandpay-types"
import Link from 'next/link';

interface SubcribeProps {
    cardlist: Methods
}

const SubcribeAdd: React.FC<SubcribeProps> = ({cardlist}) => {
  if(cardlist.accounts.length === 0 && cardlist.cards.length === 0) return (
      <>
        등록된 카드나 계좌가 없습니다.<Link href={'/paylist'}><a className='font-sky-500'>여기</a></Link>에서 카드나 계좌를 등록해주세요.
      </>
  )
  return (
    <>
    </>
  );
};

export default SubcribeAdd;