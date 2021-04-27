import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import routerList from './routerList';

class CustomRoute extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<span>Loading...</span>}>
          <Switch>
            {
              Object.assign(routerList).map(({ path, exact, routes, component: LazyComponent }, key) => {
                let newItem = { path, exact, routes };
                return <Route key={key} {...newItem} render={(props) => <LazyComponent {...props} routes={routes} />}></Route>
              })
            }
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default CustomRoute;