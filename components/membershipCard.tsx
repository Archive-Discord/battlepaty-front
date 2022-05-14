import config from 'config';
import React, { useEffect } from 'react';
import { Methods } from "@tosspayments/brandpay-types"
import CardMethodPayItem from './CardMethodPayItem';
import premiumCss from "@styles/premium.module.css";
import Toast from './Toast';

interface MembershipCardProps {
  example?: boolean;
  name: string;

  benefit: string[];
  cardlist?: Methods;
}

const MembershipCard: React.FC<MembershipCardProps> = ({example, name, benefit, cardlist}) => {
  const buyHandler = () => {
    if(example) return
    if(!cardlist) return Toast('등록된 결제수단이 없습니다.')
  }
  return (
    <>
    <div className='flex flex-row flex-wrap w-full lg:space-x-5 lg:space-y-0 space-y-5  justify-center'>
      <div className={premiumCss.fourthCard}>
           <div className={premiumCss.fourthCardTitle}>{name} 베이직</div>
           <span className={premiumCss.fourthCardSubTitle}>4,900 ₩</span>
           <span>매월 자동결제</span>
           <hr className={premiumCss.fourthCardHr}/>
           <div className={premiumCss.fourthCardUseList}>
             {benefit.map((item, index) => (
               <>
               {
                  index > 4 ? (<>{index === 5 ? (<span key={index} className={premiumCss.fourthCardUse}><i className="fas fa-plus mr-2"/>{benefit.length - 5}개의 추가 향목</span>) : null }</>)
                  : <span key={index} className={premiumCss.fourthCardUse}><i className="fas fa-check text-lime-500 mr-2"/>{item}</span>
               }
               </>
             ))}
           </div>
           <hr className={premiumCss.fourthCardHr}/>
           <button className={premiumCss.fourthbuyButton + " hover:bg-gray-100"} onClick={(()=> buyHandler())}>구매하기</button>
       </div>
       <div className={premiumCss.fourthCard}>
           <div className={premiumCss.fourthCardTitle}>{name} 프리미엄</div>
           <span className={premiumCss.fourthCardSubTitle}>9,900 ₩</span>
           <span>매월 자동결제</span>
           <hr className={premiumCss.fourthCardHr}/>
           <div className={premiumCss.fourthCardUseList}>
            {benefit.map((item, index) => (
               <>
               {
                  index > 4 ? (<>{index === 5 ? (<span key={index} className={premiumCss.fourthCardUse}><i className="fas fa-plus mr-2"/>{benefit.length - 5}개의 추가 향목</span>) : null }</>)
                  : <span key={index} className={premiumCss.fourthCardUse}><i className="fas fa-check text-lime-500 mr-2"/>{item}</span>
               }
               </>
             ))}
           </div>
           <hr className={premiumCss.fourthCardHr}/>
           <button className={premiumCss.fourthbuyButton + " hover:bg-gray-100"} onClick={(()=> buyHandler())}>구매하기</button>
       </div>
      </div>
    </>
  );
};


MembershipCard.defaultProps = {
  example: false,
}

export default MembershipCard;