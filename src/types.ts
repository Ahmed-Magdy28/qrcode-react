export interface QRCodeConfig {
   data: string;
   type: 'link' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';
   backgroundColor: string;
   foregroundColor: string;
   border: boolean;
   borderWidth?: number;
   borderColor?: string;
   logo?: string;
}

export interface GeneratorPageProps {
   onGenerate: (config: QRCodeConfig) => void;
}
export type wifiSecurity = 'WPA' | 'WEP' | 'nopass';

export type QrCodeType = 'link' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

export interface SavePageProps {
   config: QRCodeConfig;
   onBack: () => void;
}
