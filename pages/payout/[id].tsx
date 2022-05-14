import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { DiscordUserGuild, PaymentsGuild, PaymentsGuildSetting } from '@types'
import ServerCard from '@components/GuildCard'
import Toast from '@components/Toast'
import Link from 'next/link'
import PayoutSheet from '@components/PayoutSheet'
import DropDownSelect from '@components/SelectBox'

interface payoutListProps {
    server: PaymentsGuildSetting,
    message: string
}

const BankList = [
    {
        'name': "경남은행",
        'id': "KYONGNAMBANK",
        "icon": "https://static.toss.im/icons/svg/icn-bank-bnk.svg"
    },
    {
        'name': "광주은행",
        'id': "KYONGNAMBANK",
        "icon": "https://static.toss.im/icons/svg/icn-bank-kwangju.svg"
    },
    {
        'name': "KB국민은행",
        'id': "KOOKMIN",
        "icon": "https://static.toss.im/icons/svg/icn-bank-kb.svg"
    },
    {
        'name': "IBK기업은행",
        'id': "IBK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-ibk.svg"
    },
    {
        'name': "NH농협은행",
        'id': "NONGHYEOP",
        'icon': "https://static.toss.im/icons/svg/icn-bank-nh.svg"
    },
    {
        'name': "단위농협",
        'id': "LOCALNONGHYEOP",
        'icon': "https://static.toss.im/icons/svg/icn-bank-nh.svg"
    },
    {
        'name': "DGB대구은행",
        'id': "DAEGUBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-dgb.svg"
    },
    {
        'name': "부산은행",
        'id': "BUSANBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-bnk.svg"
    },
    {
        'name': "KDB산업은행",
        'id': "KDB",
        'icon': "https://static.toss.im/icons/svg/icn-bank-kdb.svg"
    },
    {
        'name': "새마을금고",
        'id': "SAEMAUL",
        'icon': "https://static.toss.im/icons/svg/icn-bank-mg.svg"
    },
    {
        'name': "산림조합",
        'id': "SANLIM",
        'icon': "https://static.toss.im/icons/svg/icn-bank-nfcf.svg"
    },
    {
        'name': "Sh수협은행",
        'id': "SUHYEOP",
        'icon': "https://static.toss.im/icons/svg/icn-bank-sh.svg"
    },
    {
        'name': "신한은행",
        'id': "SHINHAN",
        'icon': "https://static.toss.im/icons/svg/icn-bank-shinhan.svg"
    },
    {
        'name': "신협",
        'id': "SHINHYUP",
        'icon': "https://static.toss.im/icons/svg/icn-bank-cu.svg"
    },
    {
        'name': "씨티은행",
        'id': "CITI",
        'icon': "https://static.toss.im/icons/svg/icn-bank-citi.svg"
    },
    {
        'name': "우리은행",
        'id': "WOORI",
        'icon': "https://static.toss.im/icons/svg/icn-bank-woori.svg"
    },
    {
        'name': "우체국예금보험",
        'id': "POST",
        'icon': "https://static.toss.im/icons/svg/icn-bank-postoffice.svg"
    },
    {
        'name': "저축은행중앙회",
        'id': "SAVINGBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-sb.svg"
    },
    {
        'name': "전북은행",
        'id': "JEONBUKBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-jb.svg"
    },
    {
        'name': "제주은행",
        'id': "JEJUBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-shinhan.svg"
    },
    {
        'name': "카카오뱅크",
        'id': "KAKAOBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-kakao.svg"
    },
    {
        'name': "케이뱅크",
        'id': "KBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-kbank.svg"
    },
    {
        'name': "토스뱅크",
        'id': "TOSSBANK",
        'icon': "https://static.toss.im/icons/svg/icn-bank-toss.svg"
    },
    {
        'name': "하나은행",
        'id': "HANA",
        'icon': "https://static.toss.im/icons/svg/icn-bank-hana.svg"
    },
    {
        'name': "SC제일은행",
        'id': "SC",
        'icon': "https://static.toss.im/icons/svg/icn-bank-sc.svg"
    },
    {
        'name': "홍콩상하이은행",
        'id': "HSBC",
        'icon': "https://static.toss.im/icons/png/4x/icn-bank-hsbc.png"
    },
]

const PayoutList: NextPage<payoutListProps> = ({server}) => {
    const [account, setAccount] = useState<string>()
    const [bank, setBank] = useState<string>()
    const [name, setName] = useState<string>()

    const submitHandler = async () => {
        if(!account || !bank) return Toast('계좌번호를 입력해주세요', 'error')
        fetch(`${config.PAYMENTS_BASE_API_URL}/payout/${server.server.guild_id}/setting`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bank: bank,
                accountNumber: account,
                holderName: name
            }),
            
          }).then(async(data) => {
            const res = await data.json()
            if(data.ok) {
              Toast(res.message, 'success')
            } else {
              Toast(res.message, 'error')
            }
          }).catch((e) => {
            Toast(e.message, 'error')
          })
    }

    const bankHanlder = (e: any) => {
        setBank(e.id)
    }
  return (
    <>
    {server.payoutAccount ? (<>
        <h1 className='text-2xl font-bold'>서버지급 정보</h1>
        <div className='w-full border border-md p-4 rounded-xl mt-5'>
            <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold text-sky-500'>계좌번호</span>
                    <span className='text-sm font-bold'>지급 받으실 계좌번호</span>
                </div>
                <span className='flex pl-3 mt-2 lg:mt-0 w-full items-center h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]'>
                    {server.payoutAccount.account.accountNumber}
                </span>
            </div>
            <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-5'>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold text-sky-500'>은행</span>
                    <span className='text-sm font-bold'>지급 받으실 은행</span>
                </div>
                <span className='flex pl-3 mt-2 lg:mt-0 w-full items-center h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]'>
                    {server.payoutAccount.account.bank}
                </span>
            </div>
        </div>
        <h1 className='text-2xl font-bold my-4'>서버지급 기록</h1>
        <PayoutSheet server={server}/>
    </>): (<>
        <h1 className='text-2xl font-bold'>서버지급 설정</h1>
            <div className='w-full border border-md p-4 rounded-xl mt-5'>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold text-sky-500'>계좌번호</span>
                        <span className='text-sm font-bold'>지급 받으실 계좌번호를 숫자만 입력해주세요.</span>
                    </div>
                    <input onChange={(e) => (setAccount(e.target.value))} value={account} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]' placeholder='계좌번호'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-5'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold text-sky-500'>예금주</span>
                        <span className='text-sm font-bold'>지급 받으실 계좌의 예금주 이름을 입력해주세요.</span>
                    </div>
                    <input onChange={(e) => (setName(e.target.value))} value={name} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]' placeholder='예금주'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-5'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold text-sky-500'>은행</span>
                        <span className='text-sm font-bold'>지급 받으실 은행을 선택해주세요</span>
                    </div>
                    <DropDownSelect className="lg:max-w-[50vw]" items={BankList} selectCallBack={bankHanlder}/>
                </div>
                </div>
            <button onClick={() => (submitHandler())} className='border w-full py-2 mt-12 rounded-md hover:bg-gray-100'>신청하기</button>
    </>)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let server = await fetch(
    `${config.PAYMENTS_BASE_API_URL}/payout/${context.query.id}/setting`, {
        headers: {
          "authorization": "Bearer " + context.req.cookies['auth'],
        }
    })
  const serverData = await server.json()
  if(server.ok) {
    return {
      props: {
        server: serverData.data,
        message: serverData.message 
      }
    }
  } else {
    return {
      props: {
        server: null,
        message: serverData.message 
      },
    }; 
  }
};



export default PayoutList;
