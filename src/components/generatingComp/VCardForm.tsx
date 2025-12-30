import { useState } from 'react';
import { User } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function VCardForm() {
   const [vcardFirstName, setVcardFirstName] = useState('');
   const [vcardLastName, setVcardLastName] = useState('');
   const [vcardPhone, setVcardPhone] = useState('');
   const [vcardEmail, setVcardEmail] = useState('');
   const [vcardCompany, setVcardCompany] = useState('');
   const [vcardJobTitle, setVcardJobTitle] = useState('');
   const [vcardAddress, setVcardAddress] = useState('');
   const [vcardWebsite, setVcardWebsite] = useState('');
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
