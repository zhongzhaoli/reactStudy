import React from 'react';
// import { Route } from 'react-router-dom';
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // let { routes } = this.props;
    return (
      <div>
        <div>User</div>
        {/* {
          routes && routes.length ? routes.map(({ path, LazyComponent, exact = true }, key) => {
            return <Route key={key} path={path} component={LazyComponent} exact={exact} />
          }) : ""
        } */}
      </div>
    )
  }
}
export default User;