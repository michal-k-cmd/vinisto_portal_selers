export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');

	const response = await fetch(`https://login.szn.cz/api/v1/oauth/token`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
			grant_type: 'authorization_code',
			client_id: process.env.NEXT_PUBLIC_SEZNAM_CLIENT_ID,
			client_secret: process.env.SEZNAM_CLIENT_SECRET,
			redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URI}api/oauth/callback/seznam/`,
		}),
	});

	const data = await response.json();

	const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Přihlašování...</title>
  </head>
  <body>
    <script>
      (function() {
        try {
          var payload = ${JSON.stringify(JSON.stringify(data))};
          var message = { type: 'SEZNAM_OAUTH_TOKEN', data: JSON.parse(payload) };
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(message, window.location.origin);
          }
        } catch (e) {
          try {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'SEZNAM_OAUTH_ERROR' }, '*');
            }
          } catch (_) {}
        } finally {
          window.close();
        }
      })();
    </script>
  </body>
</html>`;

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
