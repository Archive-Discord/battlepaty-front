import config from 'config';
import React, { useEffect } from 'react';

const Layout: React.FC = () => {
  useEffect(() => {
      window.location.assign(config.FRONT_URL);
  })
  return (
    <>
      <div className='flex w-full h-full items-center justify-center text-xl'>
        로그인 후 재접속 해주세요.
      </div>
    </>
  );
};

export default Layout;