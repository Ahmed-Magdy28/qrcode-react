import type { QrCodeType } from '../../types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import WifiForm from './WifiForm';
import VCardForm from './VCardForm';
import { getPlaceholder } from '../../config';

export const renderTypeSpecificFields = ({
   qrType,
   inputValue,
   setInputValue,
}: {
   qrType: QrCodeType;
   inputValue: string;
   setInputValue: (input: string) => void;
}) => {
   if (qrType === 'wifi') {
      return <WifiForm />;
   }

   if (qrType === 'vcard') {
      <VCardForm />;
   }

   return (
      <div className="space-y-2">
         <Label htmlFor="input-value">Content</Label>
         <Input
            id="input-value"
            type="text"
            placeholder={getPlaceholder(qrType)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
         />
      </div>
   );
};
