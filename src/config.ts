import type { QrCodeType, wifiSecurity } from './types';

export const getPlaceholder = (qrType: QrCodeType) => {
   switch (qrType) {
      case 'link':
         return 'https://example.com';
      case 'email':
         return 'email@example.com';
      case 'phone':
         return '+1234567890';
      case 'text':
         return 'Enter your text here';
      default:
         return '';
   }
};

export const generateWiFiString = ({
   wifiSecurity,
   wifiPassword,
   wifiHidden,
   wifiSSID,
}: {
   wifiSecurity: wifiSecurity;
   wifiPassword: string;
   wifiHidden: boolean;
   wifiSSID: string;
}) => {
   const encryptionType = wifiSecurity;
   const password = wifiSecurity === 'nopass' ? '' : wifiPassword;
   const hidden = wifiHidden ? 'true' : 'false';

   return `WIFI:T:${encryptionType};S:${wifiSSID};P:${password};H:${hidden};;`;
};
