'use client';

import { useEffect } from 'react';

const FacebookPixelLoader = () => {
	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_KEY;
		if (!apiKey) return;

		const pixelScript = document.createElement('script');
		pixelScript.type = 'text/javascript';
		pixelScript.async = true;
		pixelScript.innerHTML = `
			!function(f,b,e,v,n,t,s)
			{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};
			if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
			n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t,s)}(window, document,'script',
			'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '${apiKey}');
			fbq('track', 'PageView');
    `;

		/*
		* The original facebook pixel should be implemented with noscript fallback.
		* Our web doesnt work without scripts, therefore its not necessary to track this.
		* <noscript>
			<img height="1" width="1" style="display:none"
					 src="https://www.facebook.com/tr?id=${apiKey}&ev=PageView&noscript=1"/>
		</noscript>
		*/

		document.body.appendChild(pixelScript);

		return () => {
			document.body.removeChild(pixelScript);
		};
	}, []);

	return null;
};

export default FacebookPixelLoader;
