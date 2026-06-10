export function ThemeScript() {
	const script = `(function(){try{var s=localStorage.getItem('theme'),d=document.documentElement;if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})();`;
	return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
