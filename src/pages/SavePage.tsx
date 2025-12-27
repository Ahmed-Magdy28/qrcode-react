import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '../components/ui/card';
import type { QRCodeConfig } from '../types';

interface SavePageProps {
   config: QRCodeConfig;
   onBack: () => void;
}

export function SavePage({ config, onBack }: SavePageProps) {
   const [size, setSize] = useState(300);
   const qrCodeRef = useRef<HTMLDivElement>(null);
   const qrCodeInstance = useRef<QRCodeStyling | null>(null);

   useEffect(() => {
      if (!qrCodeRef.current) return;

      // Clear previous QR code
      qrCodeRef.current.innerHTML = '';

      // Create new QR code instance
      const qrCode = new QRCodeStyling({
         width: size,
         height: size,
         data: config.data,
         dotsOptions: {
            color: config.foregroundColor,
            type: 'rounded',
         },
         backgroundOptions: {
            color: config.backgroundColor,
         },
         imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10,
         },
         cornersSquareOptions: {
            type: 'extra-rounded',
         },
         cornersDotOptions: {
            type: 'dot',
         },
         ...(config.logo && {
            image: config.logo,
         }),
      });

      qrCodeInstance.current = qrCode;
      qrCode.append(qrCodeRef.current);
   }, [config, size]);

   const handleDownload = (format: 'png' | 'svg' | 'jpeg') => {
      if (qrCodeInstance.current) {
         qrCodeInstance.current.download({
            extension: format,
            name: `qrcode-${config.type}-${Date.now()}`,
         });
      }
   };

   const getTypeLabel = () => {
      switch (config.type) {
         case 'link':
            return 'Link/URL';
         case 'text':
            return 'Text';
         case 'email':
            return 'Email';
         case 'phone':
            return 'Phone';
         case 'wifi':
            return 'WiFi Network';
         case 'vcard':
            return 'Personal Card';
         default:
            return config.type;
      }
   };

   const getContentPreview = () => {
      if (config.type === 'wifi') {
         const wifiMatch = config.data.match(
            /WIFI:T:([^;]+);S:([^;]+);P:([^;]*);H:([^;]+);;/,
         );
         if (wifiMatch) {
            return `${wifiMatch[2]} (${wifiMatch[1]})`;
         }
      } else if (config.type === 'vcard') {
         const nameMatch = config.data.match(/FN:([^\n]+)/);
         if (nameMatch) {
            return nameMatch[1];
         }
      }
      return config.data;
   };

   return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
         <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 size-4" />
            Back to Generator
         </Button>

         <Card className="shadow-lg">
            <CardHeader>
               <CardTitle>Your QR Code</CardTitle>
               <CardDescription>
                  Adjust the size and download in your preferred format
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* QR Code Preview */}
               <div className="flex justify-center p-8 bg-slate-50 rounded-lg">
                  <div
                     ref={qrCodeRef}
                     className={`${config.border ? 'p-4 border-4 border-slate-300 rounded-lg bg-white' : ''}`}
                  />
               </div>

               {/* Size Control */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <Label>QR Code Size</Label>
                     <span className="text-sm text-slate-600">
                        {size} x {size} px
                     </span>
                  </div>
                  <Slider
                     value={[size]}
                     onValueChange={(values) => setSize(values[0])}
                     min={150}
                     max={600}
                     step={50}
                     className="w-full"
                  />
               </div>

               {/* Download Buttons */}
               <div className="space-y-3">
                  <Label>Download Format</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                     <Button
                        onClick={() => handleDownload('png')}
                        variant="outline"
                        className="w-full"
                     >
                        <Download className="mr-2 size-4" />
                        PNG
                     </Button>
                     <Button
                        onClick={() => handleDownload('svg')}
                        variant="outline"
                        className="w-full"
                     >
                        <Download className="mr-2 size-4" />
                        SVG
                     </Button>
                     <Button
                        onClick={() => handleDownload('jpeg')}
                        variant="outline"
                        className="w-full"
                     >
                        <Download className="mr-2 size-4" />
                        JPEG
                     </Button>
                  </div>
               </div>

               {/* Info Section */}
               <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                        <span className="text-slate-600">Type:</span>
                        <span>{getTypeLabel()}</span>
                     </div>
                     <div className="flex justify-between items-start">
                        <span className="text-slate-600">Content:</span>
                        <span className="truncate max-w-xs ml-2 text-right">
                           {getContentPreview()}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-600">Colors:</span>
                        <span className="flex gap-2">
                           <span
                              className="inline-block w-6 h-6 rounded border border-slate-300"
                              style={{
                                 backgroundColor: config.backgroundColor,
                              }}
                              title={`Background: ${config.backgroundColor}`}
                           />
                           <span
                              className="inline-block w-6 h-6 rounded border border-slate-300"
                              style={{
                                 backgroundColor: config.foregroundColor,
                              }}
                              title={`Foreground: ${config.foregroundColor}`}
                           />
                        </span>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
