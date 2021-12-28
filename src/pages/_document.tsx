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
        <Head />
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
