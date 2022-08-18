import Document, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="cleartype" content="on" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="scrollbar bg-abc-dark">
          <Main />
          <NextScript />
          <div className="transform-gpu"></div>
        </body>
      </Html>
    );
  }
}
