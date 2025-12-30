export const generateVCardString = ({
   vcardFirstName,
   vcardLastName,
   vcardPhone,
   vcardEmail,
   vcardCompany,
   vcardJobTitle,
   vcardAddress,
   vcardWebsite,
}: {
   vcardFirstName: string;
   vcardLastName: string;
   vcardPhone: string;
   vcardEmail: string;
   vcardCompany: string;
   vcardJobTitle: string;
   vcardAddress: string;
   vcardWebsite: string;
}) => {
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
