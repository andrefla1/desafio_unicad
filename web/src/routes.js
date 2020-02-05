import React from 'react';
const Entrega = React.lazy(() => import('./pages/Entrega'));
const NovaEntrega = React.lazy(() => import('./pages/NovaEntrega'));
const Mapa = React.lazy(() => import('./pages/Mapa'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/entrega', exact: true, name: 'Entrega', component: Entrega },
  { path: '/nova-entrega', name: 'Nova Entrega', component: NovaEntrega },
  { path: '/mapa/:id', name: 'Mapa', component: Mapa },
];

export default routes;
