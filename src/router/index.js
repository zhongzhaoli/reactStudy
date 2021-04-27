import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import routerList from './routerList';

class CustomRoute extends React.Component {
  routerListRecursion = (routerList) => {
    return Object.assign(routerList).map((item, key) => {
      let { routes } = item;
      if(routes && routes.length){
        return <div>
          <Route key={key} {...item} render={(props) => <item.component {...props}/>}></Route>
          <Switch>
            {this.routerListRecursion(routes)}
          </Switch>
        </div>
      } else {
        return <Route key={key} {...item} render={(props) => <item.component {...props}/>}></Route>
      }
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<span>Loading...</span>}>
            <Switch>
              {this.routerListRecursion(routerList)}
            </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default CustomRoute;