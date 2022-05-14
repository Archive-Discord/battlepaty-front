import { PaymentsGuildSetting } from '@types';
import React, { useEffect } from 'react';

interface PayoutSheetProps {
    server: PaymentsGuildSetting;
}

const PayoutSheet: React.FC<PayoutSheetProps> = ({server}) => {
  return (
    <>
    {server.server.benefit.map((item) => (<>{item},</>))}
    </>
  );
};

export default PayoutSheet;