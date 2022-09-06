import Document, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en" className="h-full">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="cleartype" content="on" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preload" href="/fonts/abc.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="scrollbar h-full bg-blue-50">
          <Main />
          <NextScript />
          <div id="react-modal-root"></div>
          <div className="transform-gpu"></div>
        </body>
      </Html>
    );
  }
}
