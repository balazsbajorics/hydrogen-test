import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen/client';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';

import shopifyConfig from '../shopify.config';

import DefaultSeo from './components/DefaultSeo.client';
import NotFound from './components/NotFound.client';
import CartProvider from './components/CartProvider.client';
import LoadingFallback from './components/LoadingFallback';

export default function App({...serverState}) {
  // const pages = import.meta.globEager('./pages/**/*.client.[jt]sx');
  const pages = []
  // const pages = {
  //   './pages/Index.client.jsx': {
  //     __proto__: null,
  //     [Symbol.toStringTag]: 'Module',
  //     default: Index,
  //   },
  //   './pages/collections/[handle].client.jsx': {
  //     __proto__: null,
  //     [Symbol.toStringTag]: 'Module',
  //     default: Collection,
  //   },
  // };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
        <CartProvider>
          <DefaultSeo />
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<NotFound />}
            />
          </Switch>
        </CartProvider>
      </ShopifyServerProvider>
    </Suspense>
  );
}
