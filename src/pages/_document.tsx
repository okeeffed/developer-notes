import { ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react";
import Document, { Head, Html, Main, NextScript } from "next/document";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <meta
            name="google-site-verification"
            content="rF9T3lHvmMrLF2AA1DpzkyZUJ6MZCKYvXAtxpuRyhL8"
          ></meta>
          {/* google adsense */}
          <script
            data-ad-client="ca-pub-3242257428325939"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-3242257428325939",
            enable_page_level_ads: true
            });
            `,
            }}
          /> */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
