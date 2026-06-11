import Script from "next/script";

export function FontSizeScript() {
  return (
    <Script
      id="font-size-init"
      strategy="beforeInteractive"
    >{`(function(){try{var s=localStorage.getItem('font-size');document.documentElement.style.fontSize=s==='sm'?'16px':s==='lg'?'20px':'18px'}catch(e){}})();`}</Script>
  );
}
