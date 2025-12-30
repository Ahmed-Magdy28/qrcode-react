import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
   ArrowLeft,
   Download,
   Palette,
   Image as ImageIcon,
   Settings2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import type { SavePageProps } from '../types';
import Footer from '../components/footer/Footer';

export function SavePage({ config: initialConfig, onBack }: SavePageProps) {
   const [size, setSize] = useState(300);
   const [showCustomSize, setShowCustomSize] = useState(false);
   const [customWidth, setCustomWidth] = useState(300);
   const [customHeight, setCustomHeight] = useState(300);

   // Editable config
   const [backgroundColor, setBackgroundColor] = useState(
      initialConfig.backgroundColor,
   );
   const [foregroundColor, setForegroundColor] = useState(
      initialConfig.foregroundColor,
   );
   const [border, setBorder] = useState(initialConfig.border);
   const [borderWidth, setBorderWidth] = useState(
      initialConfig.borderWidth || 10,
   );
   const [borderColor, setBorderColor] = useState(
      initialConfig.borderColor || '#000000',
   );
   const [logo, setLogo] = useState<string | undefined>(initialConfig.logo);

   const qrCodeRef = useRef<HTMLDivElement>(null);
   const qrCodeInstance = useRef<QRCodeStyling | null>(null);
   const logoInputRef = useRef<HTMLInputElement>(null);

   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = (event) => {
            setLogo(event.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const currentWidth = showCustomSize ? customWidth : size;
   const currentHeight = showCustomSize ? customHeight : size;

   useEffect(() => {
      if (!qrCodeRef.current) return;

      // Clear previous QR code
      qrCodeRef.current.innerHTML = '';

      // Create new QR code instance
      const qrCode = new QRCodeStyling({
         width: currentWidth,
         height: currentHeight,
         data: initialConfig.data,
         dotsOptions: {
            color: foregroundColor,
            type: 'rounded',
         },
         backgroundOptions: {
            color: backgroundColor,
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
         ...(logo && {
            image: logo,
         }),
      });

      qrCodeInstance.current = qrCode;
      qrCode.append(qrCodeRef.current);
   }, [
      initialConfig.data,
      currentWidth,
      currentHeight,
      backgroundColor,
      foregroundColor,
      logo,
   ]);

   const handleDownload = (format: 'png' | 'svg' | 'jpeg') => {
      if (qrCodeInstance.current) {
         qrCodeInstance.current.download({
            extension: format,
            name: `qrcode-${initialConfig.type}-${Date.now()}`,
         });
      }
   };

   const getTypeLabel = () => {
      switch (initialConfig.type) {
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
            return initialConfig.type;
      }
   };

   const getContentPreview = () => {
      if (initialConfig.type === 'wifi') {
         const wifiMatch = initialConfig.data.match(
            /WIFI:T:([^;]+);S:([^;]+);P:([^;]*);H:([^;]+);;/,
         );
         if (wifiMatch) {
            return `${wifiMatch[2]} (${wifiMatch[1]})`;
         }
      } else if (initialConfig.type === 'vcard') {
         const nameMatch = initialConfig.data.match(/FN:([^\n]+)/);
         if (nameMatch) {
            return nameMatch[1];
         }
      }
      return initialConfig.data;
   };

   return (
      <>
         <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button variant="ghost" onClick={onBack} className="mb-6">
               <ArrowLeft className="mr-2 size-4" />
               Back to Generator
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* QR Code Preview */}
               <Card className="shadow-lg">
                  <CardHeader>
                     <CardTitle>QR Code Preview</CardTitle>
                     <CardDescription>Your generated QR code</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="flex justify-center p-8 bg-slate-50 rounded-lg">
                        <div
                           ref={qrCodeRef}
                           className={`${border ? `p-${borderWidth} rounded-lg` : ''}`}
                           style={
                              border
                                 ? {
                                      border: `${borderWidth}px solid ${borderColor}`,
                                      backgroundColor: 'white',
                                   }
                                 : {}
                           }
                        />
                     </div>

                     {/* Info Section */}
                     <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
                              <span className="text-slate-600">Size:</span>
                              <span>
                                 {currentWidth} x {currentHeight} px
                              </span>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Customization Controls */}
               <div className="space-y-6">
                  {/* Size Control */}
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Settings2 className="size-5" />
                           Size Settings
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <Label>QR Code Size</Label>
                              <span className="text-sm text-slate-600">
                                 {size} x {size} px
                              </span>
                           </div>
                           <Slider
                              value={[size]}
                              onValueChange={(values) => {
                                 setSize(values[0]);
                                 setShowCustomSize(false);
                              }}
                              min={150}
                              max={600}
                              step={50}
                              className="w-full"
                              disabled={showCustomSize}
                           />
                        </div>

                        <Button
                           variant="outline"
                           className="w-full"
                           onClick={() => setShowCustomSize(!showCustomSize)}
                        >
                           {showCustomSize ? 'Use Preset Size' : 'Custom Size'}
                        </Button>

                        {showCustomSize && (
                           <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className="space-y-2">
                                 <Label htmlFor="custom-width">
                                    Width (px)
                                 </Label>
                                 <Input
                                    id="custom-width"
                                    type="number"
                                    min={100}
                                    max={2000}
                                    value={customWidth}
                                    onChange={(e) =>
                                       setCustomWidth(Number(e.target.value))
                                    }
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="custom-height">
                                    Height (px)
                                 </Label>
                                 <Input
                                    id="custom-height"
                                    type="number"
                                    min={100}
                                    max={2000}
                                    value={customHeight}
                                    onChange={(e) =>
                                       setCustomHeight(Number(e.target.value))
                                    }
                                 />
                              </div>
                           </div>
                        )}
                     </CardContent>
                  </Card>

                  {/* Color Controls */}
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Palette className="size-5" />
                           Colors
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="bg-color">Background Color</Label>
                           <Input
                              id="bg-color"
                              type="color"
                              value={backgroundColor}
                              onChange={(e) =>
                                 setBackgroundColor(e.target.value)
                              }
                              className="h-10 cursor-pointer w-full"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="fg-color">Foreground Color</Label>
                           <Input
                              id="fg-color"
                              type="color"
                              value={foregroundColor}
                              onChange={(e) =>
                                 setForegroundColor(e.target.value)
                              }
                              className="h-10 cursor-pointer w-full"
                           />
                        </div>
                     </CardContent>
                  </Card>

                  {/* Border Controls */}
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle>Border</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Label
                              htmlFor="border-switch"
                              className="cursor-pointer"
                           >
                              Add Border
                           </Label>
                           <Switch
                              id="border-switch"
                              checked={border}
                              onCheckedChange={setBorder}
                           />
                        </div>

                        {border && (
                           <>
                              <div className="space-y-2">
                                 <div className="flex items-center justify-between">
                                    <Label>Border Width</Label>
                                    <span className="text-sm text-slate-600">
                                       {borderWidth}px
                                    </span>
                                 </div>
                                 <Slider
                                    value={[borderWidth]}
                                    onValueChange={(values) =>
                                       setBorderWidth(values[0])
                                    }
                                    min={1}
                                    max={50}
                                    step={1}
                                    className="w-full"
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="border-color">
                                    Border Color
                                 </Label>
                                 <Input
                                    id="border-color"
                                    type="color"
                                    value={borderColor}
                                    onChange={(e) =>
                                       setBorderColor(e.target.value)
                                    }
                                    className="h-10 cursor-pointer w-full"
                                 />
                              </div>
                           </>
                        )}
                     </CardContent>
                  </Card>

                  {/* Logo Upload */}
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <ImageIcon className="size-5" />
                           Logo
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <input
                           aria-label="unknown"
                           ref={logoInputRef}
                           type="file"
                           accept="image/*"
                           onChange={handleLogoUpload}
                           className="hidden"
                        />
                        <div className="flex gap-2">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => logoInputRef.current?.click()}
                              className="flex-1"
                           >
                              {logo ? 'Change Logo' : 'Add Logo'}
                           </Button>
                           {logo && (
                              <Button
                                 type="button"
                                 variant="destructive"
                                 onClick={() => setLogo(undefined)}
                              >
                                 Remove
                              </Button>
                           )}
                        </div>
                        {logo && (
                           <div className="p-2 bg-slate-100 rounded-lg">
                              <img
                                 src={logo}
                                 alt="Logo preview"
                                 className="h-16 mx-auto object-contain"
                              />
                           </div>
                        )}
                     </CardContent>
                  </Card>

                  {/* Download Buttons */}
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle>Download</CardTitle>
                     </CardHeader>
                     <CardContent>
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
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
}
