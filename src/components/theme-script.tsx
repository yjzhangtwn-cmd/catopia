import Script from "next/script";

export function ThemeScript() {
  return (
    <Script
      id="theme-init"
      strategy="beforeInteractive"
    >{`(function(){try{var s=localStorage.getItem('theme'),d=document.documentElement,dark=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches);d.classList.toggle('dark',dark);if(s===null)localStorage.setItem('theme',dark?'dark':'light')}catch(e){}})();`}</Script>
  );
}
