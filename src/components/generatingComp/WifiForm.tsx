import { useState } from 'react';
import { Wifi } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../ui/select';
import type { wifiSecurity } from '../../types';

export default function WifiForm() {
   // WiFi specific fields
   const [wifiSSID, setWifiSSID] = useState('');
   const [wifiPassword, setWifiPassword] = useState('');
   const [wifiSecurity, setWifiSecurity] = useState<wifiSecurity>('WPA');
   const [wifiHidden, setWifiHidden] = useState(false);
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
               onValueChange={(value: wifiSecurity) => setWifiSecurity(value)}
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
