import { User } from "@types";
import { checkUserFlag, userAvaterLink, UserFlags } from "@utils/Tools";
import config from "config";
import type { NextPage } from "next";
import Link from "next/link";

interface SidebarProps {
    user: User;
    path: string;
}

const SideBar: NextPage<SidebarProps> = ({ user, path }) => {
  return (
<>
      <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-white dark:bg-battlebot-dark h-full text-black transition-all duration-300 border border-solid border-y-0 sidebar text-black dark:border-none">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow h-full">
          <ul className="flex flex-col py-4 space-y-1 h-full">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide dark:text-white text-black uppercase">
                  결제
                </div>
              </div>
            </li>
            <li>
              <Link href={`/paylist`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 text-white-600 hover:text-white-800 border-l-4 ${path === '/paylist' ? 'border-sky-500' : 'border-transparent'}  hover:border-sky-500 pr-6`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-credit-card"/>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    결제수단
                  </span>
                </a>
              </Link>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide dark:text-white text-black uppercase">
                  구독
                </div>
              </div>
            </li>
            <li>
              <Link href={`/subscribelist`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 text-white-600 hover:text-white-800 border-l-4 ${path === '/subscribelist' ? 'border-sky-500' : 'border-transparent'} hover:border-sky-500 pr-6`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-list"/>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    구독중인 목록
                  </span>
                </a>
              </Link>
              <Link href={`/orderlist`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 text-white-600 hover:text-white-800 border-l-4 ${path === '/orderlist' ? 'border-sky-500' : 'border-transparent'} hover:border-sky-500 pr-6`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-receipt"/>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    결제기록
                  </span>
                </a>
              </Link>
            </li>
              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide dark:text-white text-black uppercase">
                    관리자
                  </div>
                </div>
              </li>
              <li>
                <Link href={`/payout`}>
                  <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 text-white-600 hover:text-white-800 border-l-4 ${path === '/admin' ? 'border-sky-500' : 'border-transparent'} hover:border-sky-500 pr-6`}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className="fas fa-hammer"/>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      정산관리
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/addserver`}>
                  <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 text-white-600 hover:text-white-800 border-l-4 ${path === '/admin' ? 'border-sky-500' : 'border-transparent'} hover:border-sky-500 pr-6`}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className="fas fa-plus"/>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      이용신청
                    </span>
                  </a>
                </Link>
              </li>
          </ul>
          <div className="relative flex flex-row items-center justify-center h-20 border-t md:p-4 p-2">
            <img className="border rounded-full md:h-12 md:w-12 w-12 items-center md:ml-0 ml-2" src={userAvaterLink(user)}/>
            <div className="ml-2 tracking-wide truncate flex items-baseline flex flex-row flex-wrap">
              <span className="text-lg">{user.username}</span><p className="text-sm text-gray-600">#{user.discriminator}</p>
              <Link href={config.BASE_API_URL + "/auth/logout"}>
                <i className="fas fa-sign-out-alt ml-2 text-gray-600 hover:text-gray-800"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default SideBar;