import type { RefObject } from 'react';

export default function QrCodePreview({
   currentWidth,
   currentHeight,
   qrCodeRef,
   border,
   borderWidth,
   borderColor,
   getTypeLabel,
   getContentPreview,
}: {
   currentWidth: number;
   currentHeight: number;
   qrCodeRef: RefObject<HTMLDivElement | null>;
   border: boolean;
   borderWidth: number;
   borderColor: string;
   getTypeLabel: () =>
      | 'Link/URL'
      | 'Text'
      | 'Email'
      | 'Phone'
      | 'WiFi Network'
      | 'Personal Card';
   getContentPreview: () => string;
}) {
   const PREVIEW_MAX = 300;
   const scale = Math.min(
      PREVIEW_MAX / currentWidth,
      PREVIEW_MAX / currentHeight,
      1,
   );
   return (
      <>
         {' '}
         <div className="flex justify-center p-8 bg-slate-50 rounded-lg">
            {/* Fixed preview frame */}
            <div
               style={{
                  width: 300,
                  height: 300,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               {/* Scale layer */}
               <div
                  style={{
                     // Scale uniformly based on the largest side
                     transform:
                        currentWidth > 300 || currentHeight > 300
                           ? `scale(${300 / Math.max(currentWidth, 300)})`
                           : 'scale(1)',
                     transformOrigin: 'center',
                  }}
               >
                  {/* QR mount point – NEVER transform this */}
                  <div
                     ref={qrCodeRef}
                     className={border ? 'rounded-lg' : ''}
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
            </div>
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
         {scale < 1 && (
            <p className="text-xs text-slate-500 text-center mt-2">
               Preview scaled to fit — downloaded file keeps full size
            </p>
         )}
      </>
   );
}
