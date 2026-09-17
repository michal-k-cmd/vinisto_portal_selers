interface EmailSellerProps {
	sellerName: string;
	bundleName: string;
}

interface EmailSupportProps {
	sellerName: string;
	bundleName: string;
	bundleUrl: string;
	count: number;
	where?: string;
	url: string;
	mail: string;
}

export const getEmailHtmlSeller = ({
	sellerName,
	bundleName,
}: EmailSellerProps) => {
	const domain = (
		process.env.NEXT_PUBLIC_BASE_URI ?? 'https://www.vinisto.cz'
	).replace(/\/+$/, '');

	const escapeHtml = (str: string) =>
		str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	const replacements: Record<string, string> = {
		SELLER_NAME: sellerName,
		DOMAIN_LINK: domain,
		BUNDLE_NAME: bundleName,
	};

	let result = sellerHtml;
	for (const [key, val] of Object.entries(replacements)) {
		const escaped = escapeHtml(val);
		result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), escaped);
	}

	return result;
};

export const getEmailHtmlSupport = ({
	sellerName,
	bundleName,
	bundleUrl,
	count,
	where,
	url,
	mail,
}: EmailSupportProps) => {
	const domain = (
		process.env.NEXT_PUBLIC_BASE_URI ?? 'https://www.vinisto.cz'
	).replace(/\/+$/, '');

	const escapeHtml = (str: string) =>
		str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	const replacements: Record<string, string> = {
		SELLER_NAME: sellerName,
		DOMAIN_LINK: domain,
		BUNDLE_NAME: bundleName,
		BUNDLE_URL: bundleUrl,
		COUNT: count.toString(),
		WHERE: where || '- neuvedeno -',
		URL: url,
		MAIL: mail,
	};

	let result = supportHtml;
	for (const [key, val] of Object.entries(replacements)) {
		const escaped = escapeHtml(val);
		result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), escaped);
	}

	return result;
};

const sellerHtml = `<!DOCTYPE html>
<html
  lang="cs"
  style="padding: 0; margin: 0"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="format-detection"
      content="telephone=yes,address=no,email=yes,date=no,url=no"
    />
    <meta
      name="color-scheme"
      content="light"
    />
    <meta
      name="supported-color-schemes"
      content="light"
    />
    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        font-family: Roboto, Arial, sans-serif;
        color: #4d4d4e;
        background-color: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      a {
        text-decoration: underline !important;
        color: #68a910;
      }
      a:hover {
        text-decoration: none !important;
      }
      a.btn:hover {
        background-color: rgba(104, 169, 16, 0.85) !important;
        color: #ffffff !important;
        text-decoration: none !important;
      }
      a.secondary-btn:hover {
        background-color: rgba(112, 112, 112, 0.85) !important;
        color: #ffffff !important;
        text-decoration: none !important;
      }
    </style>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <title>vinisto - marketplace s vínem a destiláty</title>
  </head>
  <body style="margin: 0; padding: 0; mso-line-height-rule: exactly">
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #ffffff"
    >
      <tr>
        <td align="center">
          <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
        <![endif]-->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              max-width: 600px;
              margin: 0 auto;
              color: #4d4d4e;
              font-family: Arial, sans-serif;
            "
          >
            <tr>
              <td style="padding: 0 10px">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="border-bottom: 2px solid #e6e6e6; margin-bottom: 25px"
                >
                  <tr>
                    <td
                      valign="middle"
                      align="left"
                      style="width: 180px; padding: 30px 0"
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_vinisto.png"
                        alt="vinisto"
                        width="180"
                        height="47"
                        style="
                          display: block;
                          border: 0;
                          vertical-align: middle;
                          height: auto;
                        "
                      />
                    </td>
                    <td
                      valign="middle"
                      align="right"
                      style="font-size: 12px; font-weight: 700; padding: 30px 0"
                    >
                      <span
                        style="
                          color: #68a910;
                          text-decoration: underline;
                          font-weight: 700;
                          font-size: 12px;
                        "
                      >
                        {SELLER_NAME}
                      </span>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="margin-bottom: 25px"
                >
                  <tr>
                    <td style="padding: 0 0 10px 0; text-align: center">
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_package.png"
                        alt=""
                        width="40"
                        height="40"
                        style="display: inline-block; border: 0; margin: 0 auto"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        padding: 0 0 15px 0;
                        text-align: center;
                        font-size: 24px;
                        font-weight: 700;
                      "
                    >
                      Garance nejnižší ceny
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-size: 14px;
                        line-height: 18px;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: 700"
                        >Vážený prodejce {SELLER_NAME},</span
                      ><br />
                      Váš produkt
                      <span style="font-weight: 700">{BUNDLE_NAME}</span> našel
                      zákazník levnější a upozornil nás na to. <br /><br />
                      Musíme srovnat cenu, aby si zákazník produkt koupil.<br /><br />
                      <span style="font-weight: 700"
                        >Náš tým Vás bude obratem kontaktovat.</span
                      ><br /><br />
                      Děkujeme a přejeme Vám pěkný den,<br />
                      Vaše vinisto!
                    </td>
                  </tr>
                </table>

                <h2
                  style="
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 14px 0;
                    text-align: center;
                  "
                >
                  Potřebujete poradit?
                </h2>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    padding: 0;
                    margin-bottom: 20px;
                    border-spacing: 10px;
                    font-size: 12px;
                  "
                >
                  <tr>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_faq.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Přečtěte si odpovědi<br />
                      na
                      <a
                        href="{DOMAIN_LINK}/nejcastejsi-dotazy-prodejcu"
                        style="color: #68a910; text-decoration: underline"
                        >nejčastější dotazy</a
                      >.
                    </td>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_write.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Napište nám<br />
                      <a
                        href="mailto:podpora@vinisto.cz"
                        style="color: #68a910; text-decoration: underline"
                        >podpora@vinisto.cz</a
                      >.
                    </td>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_call.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Zavolejte nám<br />
                      <a
                        href="tel:+420606758080"
                        style="color: #68a910; text-decoration: underline"
                        >+420 606 758 080</a
                      >.
                    </td>
                  </tr>
                </table>
                <h2
                  style="
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                    text-align: center;
                  "
                >
                  Sledujte nás na sociálních sítích
                </h2>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="auto"
                  style="
                    padding: 0;
                    margin: 0 auto;
                    border-spacing: 10px;
                    font-size: 11px;
                    line-height: 14px;
                    vertical-align: middle;
                    border: none;
                  "
                >
                  <tr>
                    <td style="color: #68a910">#jsmevinisto</td>
                    <td>soutěže</td>
                    <td>novinky</td>
                    <td>inspirace</td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="auto"
                  style="
                    padding: 0;
                    margin: 0 auto 20px;
                    border-spacing: 8px;
                    vertical-align: middle;
                    border: none;
                  "
                >
                  <tr>
                    <td>
                      <a
                        href="{DOMAIN_LINK}"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_web.png"
                          alt="Web"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.facebook.com/vinistocz"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_facebook.png"
                          alt="Facebook"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.instagram.com/vinisto_cz/"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_instagram.png"
                          alt="Instagram"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.linkedin.com/company/vinisto/"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_linkedin.png"
                          alt="LinkedIn"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://x.com/vinistocz"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_x.png"
                          alt="X.com"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #68a910"
    >
      <tr>
        <td
          style="
            padding: 9px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            font-family: Arial, sans-serif;
          "
        >
          vinisto –––přímo od zdroje
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #f6f6f6; padding: 19px 10px"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              margin: 0 auto;
              color: #4d4d4e;
              font-family: Arial, sans-serif;
              text-align: center;
              border: none;
            "
          >
            <tr>
              <td style="font-size: 12px">
                Na tento e-mail prosím neodpovídejte, byl vám zaslán automaticky
                v souvislosti s objednávkou.<br /><br />
              </td>
            </tr>
            <tr>
              <td style="font-size: 10px">
                V případě, že si nejste jisti, zda zpráva byla určena pro vás,
                kontaktujte
                <a
                  href="{DOMAIN_LINK}/kontakty"
                  style="color: #68a910; text-decoration: underline"
                  >nás</a
                >.<br />
                vinisto s.r.o., se sídlem Jankovcova 1057/6, Holešovice, 170 00
                Praha, IČO 27082440, zapsaná v obchodním rejstříku vedeném
                Městským soudem v Praze, odd. C vložka 324492.
                <a
                  href="{DOMAIN_LINK}/obchodni-podminky"
                  style="color: #68a910; text-decoration: underline"
                  >Všeobecné obchodní podmínky</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const supportHtml = `<!DOCTYPE html>
<html
  lang="cs"
  style="padding: 0; margin: 0"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="format-detection"
      content="telephone=yes,address=no,email=yes,date=no,url=no"
    />
    <meta
      name="color-scheme"
      content="light"
    />
    <meta
      name="supported-color-schemes"
      content="light"
    />
    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        font-family: Roboto, Arial, sans-serif;
        color: #4d4d4e;
        background-color: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      a {
        text-decoration: underline !important;
        color: #68a910;
      }
      a:hover {
        text-decoration: none !important;
      }
      a.btn:hover {
        background-color: rgba(104, 169, 16, 0.85) !important;
        color: #ffffff !important;
        text-decoration: none !important;
      }
      a.secondary-btn:hover {
        background-color: rgba(112, 112, 112, 0.85) !important;
        color: #ffffff !important;
        text-decoration: none !important;
      }
    </style>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <title>vinisto - marketplace s vínem a destiláty</title>
  </head>
  <body style="margin: 0; padding: 0; mso-line-height-rule: exactly">
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #ffffff"
    >
      <tr>
        <td align="center">
          <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
        <![endif]-->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              max-width: 600px;
              margin: 0 auto;
              color: #4d4d4e;
              font-family: Arial, sans-serif;
            "
          >
            <tr>
              <td style="padding: 0 10px">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="border-bottom: 2px solid #e6e6e6; margin-bottom: 25px"
                >
                  <tr>
                    <td
                      valign="middle"
                      align="left"
                      style="width: 180px; padding: 30px 0"
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_vinisto.png"
                        alt="vinisto"
                        width="180"
                        height="47"
                        style="
                          display: block;
                          border: 0;
                          vertical-align: middle;
                          height: auto;
                        "
                      />
                    </td>
                    <td
                      valign="middle"
                      align="right"
                      style="font-size: 12px; font-weight: 700; padding: 30px 0"
                    >
                      <span
                        style="
                          color: #68a910;
                          text-decoration: underline;
                          font-weight: 700;
                          font-size: 12px;
                        "
                      >
                        {SELLER_NAME}
                      </span>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="margin-bottom: 25px"
                >
                  <tr>
                    <td style="padding: 0 0 10px 0; text-align: center">
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_package.png"
                        alt=""
                        width="40"
                        height="40"
                        style="display: inline-block; border: 0; margin: 0 auto"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        padding: 0 0 15px 0;
                        text-align: center;
                        font-size: 24px;
                        font-weight: 700;
                      "
                    >
                      Garance nejnižší ceny
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-size: 14px;
                        line-height: 18px;
                        text-align: center;
                      "
                    >
                      Produkt
                      <span style="font-weight: 700">{BUNDLE_NAME}</span> našel
                      zákazník levnější a upozornil nás na to. <br /><br />
                      Musíme srovnat cenu, aby si zákazník produkt koupil.<br /><br />
                      Prodejce:
                      <span style="font-weight: 700">{SELLER_NAME}</span><br />
                      Produkt:
                      <a
                        href="{DOMAIN_LINK}/produkt-detail/{BUNDLE_URL}"
                        style="font-weight: 700"
                        >{BUNDLE_NAME}</a
                      ><br />
                      Počet kusů:
                      <span style="font-weight: 700">{COUNT}</span>
                      <br />
                      Kde byla nalezena lepší nabídka:
                      <span style="font-weight: 700">{WHERE}</span>
                      <br />
                      Odkaz na konkrétní zboží:
                      <a
                        href="{URL}"
                        style="font-weight: 700"
                        >{URL}</a
                      >
                      <br />
                      E-mail zákazníka, který lepší nabídku našel:
                      <span style="font-weight: 700">{MAIL}</span>
                      <br /><br /><br />
                      Děkujeme a přejeme Vám pěkný den,<br />
                      Vaše vinisto!
                    </td>
                  </tr>
                </table>

                <h2
                  style="
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 14px 0;
                    text-align: center;
                  "
                >
                  Potřebujete poradit?
                </h2>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    padding: 0;
                    margin-bottom: 20px;
                    border-spacing: 10px;
                    font-size: 12px;
                  "
                >
                  <tr>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_faq.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Přečtěte si odpovědi<br />
                      na
                      <a
                        href="{DOMAIN_LINK}/nejcastejsi-dotazy-prodejcu"
                        style="color: #68a910; text-decoration: underline"
                        >nejčastější dotazy</a
                      >.
                    </td>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_write.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Napište nám<br />
                      <a
                        href="mailto:podpora@vinisto.cz"
                        style="color: #68a910; text-decoration: underline"
                        >podpora@vinisto.cz</a
                      >.
                    </td>
                    <td
                      style="
                        width: 170px;
                        border: 1px solid #f6f6f6;
                        border-radius: 10px;
                        padding: 29px 6px 20px;
                        margin: 0 10px;
                        text-align: center;
                      "
                    >
                      <img
                        src="{DOMAIN_LINK}/assets/images/mail_call.png"
                        alt=""
                        width="71"
                        height="53"
                        style="
                          display: block;
                          border: 0;
                          margin: 0 auto 20px;
                          padding: 0;
                          vertical-align: middle;
                        "
                      />
                      Zavolejte nám<br />
                      <a
                        href="tel:+420606758080"
                        style="color: #68a910; text-decoration: underline"
                        >+420 606 758 080</a
                      >.
                    </td>
                  </tr>
                </table>
                <h2
                  style="
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                    text-align: center;
                  "
                >
                  Sledujte nás na sociálních sítích
                </h2>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="auto"
                  style="
                    padding: 0;
                    margin: 0 auto;
                    border-spacing: 10px;
                    font-size: 11px;
                    line-height: 14px;
                    vertical-align: middle;
                    border: none;
                  "
                >
                  <tr>
                    <td style="color: #68a910">#jsmevinisto</td>
                    <td>soutěže</td>
                    <td>novinky</td>
                    <td>inspirace</td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="auto"
                  style="
                    padding: 0;
                    margin: 0 auto 20px;
                    border-spacing: 8px;
                    vertical-align: middle;
                    border: none;
                  "
                >
                  <tr>
                    <td>
                      <a
                        href="{DOMAIN_LINK}"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_web.png"
                          alt="Web"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.facebook.com/vinistocz"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_facebook.png"
                          alt="Facebook"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.instagram.com/vinisto_cz/"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_instagram.png"
                          alt="Instagram"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://www.linkedin.com/company/vinisto/"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_linkedin.png"
                          alt="LinkedIn"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://x.com/vinistocz"
                        style="display: block"
                      >
                        <img
                          src="{DOMAIN_LINK}/assets/images/mail_x.png"
                          alt="X.com"
                          width="30"
                          height="30"
                          style="
                            display: block;
                            border: 0;
                            margin: 0;
                            padding: 0;
                            vertical-align: middle;
                          "
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #68a910"
    >
      <tr>
        <td
          style="
            padding: 9px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            font-family: Arial, sans-serif;
          "
        >
          vinisto –––přímo od zdroje
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #f6f6f6; padding: 19px 10px"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              margin: 0 auto;
              color: #4d4d4e;
              font-family: Arial, sans-serif;
              text-align: center;
              border: none;
            "
          >
            <tr>
              <td style="font-size: 12px">
                Na tento e-mail prosím neodpovídejte, byl vám zaslán automaticky
                v souvislosti s objednávkou.<br /><br />
              </td>
            </tr>
            <tr>
              <td style="font-size: 10px">
                V případě, že si nejste jisti, zda zpráva byla určena pro vás,
                kontaktujte
                <a
                  href="{DOMAIN_LINK}/kontakty"
                  style="color: #68a910; text-decoration: underline"
                  >nás</a
                >.<br />
                vinisto s.r.o., se sídlem Jankovcova 1057/6, Holešovice, 170 00
                Praha, IČO 27082440, zapsaná v obchodním rejstříku vedeném
                Městským soudem v Praze, odd. C vložka 324492.
                <a
                  href="{DOMAIN_LINK}/obchodni-podminky"
                  style="color: #68a910; text-decoration: underline"
                  >Všeobecné obchodní podmínky</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
