import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { NotificationsProvider } from '../contexts/NotificationContext';
import { DashBoardProvider } from '../contexts/DashBoardContext';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <DashBoardProvider>
        <Layout>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </Layout>
      </DashBoardProvider>
    </Provider>
  );
}

export default MyApp;
