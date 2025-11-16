import { ReactElement } from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { DEFAULT_LOCALE, Locale } from '../configs/constants.config'

export default class MyDocument extends Document<{ lang: Locale }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { lang: Locale }> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, lang: ctx.query?.lang as Locale }
  }

  render(): ReactElement {
    return (
      <Html lang={this.props.lang || DEFAULT_LOCALE}>
        <Head>
          <meta name="description" content="Abilita lo scambio di informazioni tra enti" />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
