import { useState } from 'react';
import { QrCode, Wifi, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../components/ui/select';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import type { GeneratorPageProps, QrCodeType, wifiSecurity } from '../types';

export function GeneratorPage({ onGenerate }: GeneratorPageProps) {
   const [qrType, setQrType] = useState<
      'link' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard'
   >('link');
   const [inputValue, setInputValue] = useState('');

   // WiFi specific fields
   const [wifiSSID, setWifiSSID] = useState('');
   const [wifiPassword, setWifiPassword] = useState('');
   const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>(
      'WPA',
   );
   const [wifiHidden, setWifiHidden] = useState(false);

   // vCard specific fields
   const [vcardFirstName, setVcardFirstName] = useState('');
   const [vcardLastName, setVcardLastName] = useState('');
   const [vcardPhone, setVcardPhone] = useState('');
   const [vcardEmail, setVcardEmail] = useState('');
   const [vcardCompany, setVcardCompany] = useState('');
   const [vcardJobTitle, setVcardJobTitle] = useState('');
   const [vcardAddress, setVcardAddress] = useState('');
   const [vcardWebsite, setVcardWebsite] = useState('');

   const generateWiFiString = () => {
      const encryptionType = wifiSecurity;
      const password = wifiSecurity === 'nopass' ? '' : wifiPassword;
      const hidden = wifiHidden ? 'true' : 'false';

      return `WIFI:T:${encryptionType};S:${wifiSSID};P:${password};H:${hidden};;`;
   };

   const generateVCardString = () => {
      const vcard = [
         'BEGIN:VCARD',
         'VERSION:3.0',
         `N:${vcardLastName};${vcardFirstName};;;`,
         `FN:${vcardFirstName} ${vcardLastName}`,
         vcardPhone ? `TEL:${vcardPhone}` : '',
         vcardEmail ? `EMAIL:${vcardEmail}` : '',
         vcardCompany ? `ORG:${vcardCompany}` : '',
         vcardJobTitle ? `TITLE:${vcardJobTitle}` : '',
         vcardAddress ? `ADR:;;${vcardAddress};;;;` : '',
         vcardWebsite ? `URL:${vcardWebsite}` : '',
         'END:VCARD',
      ]
         .filter((line) => line !== '')
         .join('\n');

      return vcard;
   };

   const handleGenerate = () => {
      let dataToEncode = '';

      if (qrType === 'wifi') {
         if (!wifiSSID.trim()) {
            alert('Please enter a WiFi network name (SSID)');
            return;
         }
         if (wifiSecurity !== 'nopass' && !wifiPassword.trim()) {
            alert('Please enter a WiFi password');
            return;
         }
         dataToEncode = generateWiFiString();
      } else if (qrType === 'vcard') {
         if (!vcardFirstName.trim() && !vcardLastName.trim()) {
            alert('Please enter at least a first name or last name');
            return;
         }
         dataToEncode = generateVCardString();
      } else {
         if (!inputValue.trim()) {
            alert('Please enter a value');
            return;
         }
         dataToEncode = inputValue;
      }

      onGenerate({
         data: dataToEncode,
         type: qrType,
         backgroundColor: '#ffffff',
         foregroundColor: '#000000',
         border: false,
         borderWidth: 10,
         borderColor: '#000000',
         logo: undefined,
      });
   };

   const getPlaceholder = () => {
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

   const renderTypeSpecificFields = () => {
      if (qrType === 'wifi') {
         return (
            <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <Wifi className="size-5 text-blue-600" />
                  <h3 className="font-medium">WiFi Network Details</h3>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="wifi-ssid">Network Name (SSID) *</Label>
                  <Input
                     id="wifi-ssid"
                     type="text"
                     placeholder="My WiFi Network"
                     value={wifiSSID}
                     onChange={(e) => setWifiSSID(e.target.value)}
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="wifi-security">Security Type</Label>
                  <Select
                     value={wifiSecurity}
                     onValueChange={(value: wifiSecurity) =>
                        setWifiSecurity(value)
                     }
                  >
                     <SelectTrigger id="wifi-security">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">No Security</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {wifiSecurity !== 'nopass' && (
                  <div className="space-y-2">
                     <Label htmlFor="wifi-password">Password *</Label>
                     <Input
                        id="wifi-password"
                        type="text"
                        placeholder="Enter WiFi password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                     />
                  </div>
               )}

               <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <Label htmlFor="wifi-hidden" className="cursor-pointer">
                     Hidden Network
                  </Label>
                  <Switch
                     id="wifi-hidden"
                     checked={wifiHidden}
                     onCheckedChange={setWifiHidden}
                  />
               </div>
            </div>
         );
      }

      if (qrType === 'vcard') {
         return (
            <div className="space-y-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                  <User className="size-5 text-purple-600" />
                  <h3 className="font-medium">Personal Card Information</h3>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="vcard-firstname">First Name *</Label>
                     <Input
                        id="vcard-firstname"
                        type="text"
                        placeholder="John"
                        value={vcardFirstName}
                        onChange={(e) => setVcardFirstName(e.target.value)}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="vcard-lastname">Last Name *</Label>
                     <Input
                        id="vcard-lastname"
                        type="text"
                        placeholder="Doe"
                        value={vcardLastName}
                        onChange={(e) => setVcardLastName(e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="vcard-phone">Phone Number</Label>
                  <Input
                     id="vcard-phone"
                     type="tel"
                     placeholder="+1234567890"
                     value={vcardPhone}
                     onChange={(e) => setVcardPhone(e.target.value)}
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="vcard-email">Email</Label>
                  <Input
                     id="vcard-email"
                     type="email"
                     placeholder="john.doe@example.com"
                     value={vcardEmail}
                     onChange={(e) => setVcardEmail(e.target.value)}
                  />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="vcard-company">Company</Label>
                     <Input
                        id="vcard-company"
                        type="text"
                        placeholder="Acme Inc."
                        value={vcardCompany}
                        onChange={(e) => setVcardCompany(e.target.value)}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="vcard-jobtitle">Job Title</Label>
                     <Input
                        id="vcard-jobtitle"
                        type="text"
                        placeholder="Software Engineer"
                        value={vcardJobTitle}
                        onChange={(e) => setVcardJobTitle(e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="vcard-address">Address</Label>
                  <Input
                     id="vcard-address"
                     type="text"
                     placeholder="123 Main St, City, Country"
                     value={vcardAddress}
                     onChange={(e) => setVcardAddress(e.target.value)}
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="vcard-website">Website</Label>
                  <Input
                     id="vcard-website"
                     type="url"
                     placeholder="https://example.com"
                     value={vcardWebsite}
                     onChange={(e) => setVcardWebsite(e.target.value)}
                  />
               </div>
            </div>
         );
      }

      return (
         <div className="space-y-2">
            <Label htmlFor="input-value">Content</Label>
            <Input
               id="input-value"
               type="text"
               placeholder={getPlaceholder()}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
            />
         </div>
      );
   };

   return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
         <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
               <QrCode className="size-10 text-blue-600" />
               <h1>QR Code Generator</h1>
            </div>
            <p className="text-slate-600">
               Create custom QR codes for links, WiFi, contact cards, and more
            </p>
         </div>

         <Card className="shadow-lg">
            <CardHeader>
               <CardTitle>Configure Your QR Code</CardTitle>
               <CardDescription>
                  Customize the appearance and content
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* QR Type Selection */}
               <div className="space-y-2">
                  <Label htmlFor="qr-type">QR Code Type</Label>
                  <Select
                     value={qrType}
                     onValueChange={(value: QrCodeType) => setQrType(value)}
                  >
                     <SelectTrigger id="qr-type">
                        <SelectValue placeholder="Select type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="link">Link/URL</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="wifi">WiFi Network</SelectItem>
                        <SelectItem value="vcard">
                           Personal Card (vCard)
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Type-Specific Fields */}
               {renderTypeSpecificFields()}

               {/* Generate Button */}
               <Button
                  onClick={handleGenerate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
               >
                  <QrCode className="mr-2 size-5" />
                  Generate QR Code
               </Button>
            </CardContent>
         </Card>
      </div>
   );
}
