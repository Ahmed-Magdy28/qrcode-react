import { useState } from 'react';
import { GeneratorPage } from './pages/GeneratorPage';
import { SavePage } from './pages/SavePage';
import type { QRCodeConfig } from './types';

export default function App() {
   const [currentPage, setCurrentPage] = useState<'generator' | 'save'>(
      'generator',
   );
   const [qrConfig, setQrConfig] = useState<QRCodeConfig | null>(null);

   const handleGenerate = (config: QRCodeConfig) => {
      setQrConfig(config);
      setCurrentPage('save');
   };

   const handleBack = () => {
      setCurrentPage('generator');
   };

   return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
         {currentPage === 'generator' ? (
            <GeneratorPage onGenerate={handleGenerate} />
         ) : (
            qrConfig && <SavePage config={qrConfig} onBack={handleBack} />
         )}
      </div>
   );
}
