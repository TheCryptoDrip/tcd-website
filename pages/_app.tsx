import { Provider } from 'next-auth/client';

import { AppContextProvider } from '../lib/context';
import '../styles/tailwind.css'

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <Provider
      session={pageProps.session}>
        <AppContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContextProvider>
    </Provider>
  )
}
