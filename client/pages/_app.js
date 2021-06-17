import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import '../styles/globals.css';
// import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
