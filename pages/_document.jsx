import Document, { Html, Head, Main, NextScript } from "next/document";

const getLangFromReq = (req = {}) => {
  const headers = req.headers || {};
  const acceptLanguage = headers["accept-language"];
  return acceptLanguage && acceptLanguage.length > 0
    ? acceptLanguage.split(",")[0]
    : "en";
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head></Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
