import { useState, type RefObject } from 'react';
import type QRCodeStyling from 'qr-code-styling';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import type { QRCodeConfig } from '../../types';
export default function DownloadButtons({
   qrCodeInstance,
   initialConfig,
}: {
   qrCodeInstance: RefObject<QRCodeStyling | null>;
   initialConfig: QRCodeConfig;
}) {
   const [DownloadName, setDownloadName] = useState<string | undefined>();
   const handleDownload = (format: 'png' | 'svg' | 'jpeg') => {
      if (qrCodeInstance.current) {
         qrCodeInstance.current.download({
            extension: format,
            name: `${DownloadName ? `${DownloadName}` : `qrcode-${initialConfig.type}-${Date.now()}`}`,
         });
      }
   };

   return (
      <>
         <Label htmlFor="custom-width">Download Name (optinal)</Label>
         <br />
         <Input
            id="downloadName"
            type="name"
            className="w-full"
            aria-label="DownloadName"
            value={DownloadName}
            onChange={(e) => setDownloadName(String(e.target.value))}
         />
         <br />
         <div className="grid grid-cols-3 gap-3">
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
      </>
   );
}
