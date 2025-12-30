import CopyRight from './CopyRight';
import Logo from './Logo';
import Whatsapp from './Whatsapp';

export default function Footer() {
   return (
      <footer
         className="
         w-full
         border-t
         border-slate-200 dark:border-slate-800
         bg-slate-50 dark:bg-linear-to-r` dark:from-slate-900 dark:to-slate-950
      "
      >
         <div className="mx-auto max-w-7xl px-4 py-6">
            <div
               className="
               flex flex-col items-center gap-4
               text-center
               md:flex-row md:justify-between md:text-left
            "
            >
               <Logo />
               <CopyRight />
               <Whatsapp />
            </div>
         </div>
      </footer>
   );
}
