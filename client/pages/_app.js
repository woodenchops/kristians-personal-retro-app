import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { NotificationsProvider } from '../contexts/NotificationContext';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </Layout>
    </Provider>
  );
}

export default MyApp;
