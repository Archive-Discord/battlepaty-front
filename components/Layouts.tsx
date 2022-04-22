import { User } from '@types';
import React from 'react';
import Sidebar from '@components/SideBar';

interface LayoutProps {
    user: User;
    path: string;
}


const Layout: React.FC<LayoutProps> = ({ children, user, path }) => {
  return (
    <>
      <div className='flex'>
        <Sidebar user={user} path={path}/>
        <div className="lg:w-full max-w-[80vw] min-h-[95vh] ml-14 md:ml-64 p-4 md:p-10 dark:bg-battlebot-black dark:text-white">
            {children}
        </div>
      </div>
    </>
  );
};

export default Layout;