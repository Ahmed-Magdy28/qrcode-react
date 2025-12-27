export interface QRCodeConfig {
   data: string;
   type: 'link' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';
   backgroundColor: string;
   foregroundColor: string;
   border: boolean;
   logo?: string;
}

export interface GeneratorPageProps {
   onGenerate: (config: QRCodeConfig) => void;
}
