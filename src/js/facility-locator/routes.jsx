import { FacilityLocatorApp } from './containers/FacilityLocatorApp';
import FacilityDetail from './containers/FacilityDetail';
import VAMap from './containers/VAMap';

const routes = {
  path: '/facilities',
  component: FacilityLocatorApp,
  childRoutes: [
    {
      indexRoute: { component: VAMap }
    },
    { path: 'facility/:id', component: FacilityDetail }
  ]
};

export default routes;
