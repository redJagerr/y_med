import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import DefaultLayout from '@/layouts/default';
import Layout from '@/src/components/shared/Layout/Layout';
import { store } from '@/src/redux/store';

import '@/src/styles/globals.scss';

type CustomNextComponent = NextComponentType & { Layout?: React.ElementType };
type CustomAppProps = AppProps & { Component: CustomNextComponent };

const App = ({ Component, pageProps }: CustomAppProps) => {
  const PageLayout = Component.Layout || DefaultLayout;
  return (
    <Provider store={store}>
      <Layout>
        <PageLayout pageProps={pageProps}>
          <Component {...pageProps} />
        </PageLayout>
      </Layout>
    </Provider>
  );
};

export default App;
