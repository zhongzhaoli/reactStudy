import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routerList from '../../router/routerList';
import CustomHeader from '../../components/customHeader/index';
import CustomBreadcrumb from '../../components/customBreadcrumb/index';
import './index.css';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: []
    };
  }
  // 子路由递归方法
  routerListRecursion = (routerList) => {
    return Object.assign(routerList).map(({ path, exact, routes, component: LazyComponent }, key) => {
      let newItem = { path, exact, routes };
      if (routes && routes.length) {
        return (
          <Fragment key={`fragment${key}`}>
            <Route key={key} {...newItem} render={(props) => <LazyComponent {...props} routes={routes} />}></Route>
            <Switch key={`switch${key}`}>
              {this.routerListRecursion(routes)}
            </Switch>
          </Fragment>
        )
      } else {
        return <Route key={key} {...newItem} render={(props) => <LazyComponent {...props} />}></Route>
      }
    })
  }
  // 生命周期
  componentWillMount() {
    let { pathname } = this.props.location;
    let pathnameArr = pathname.split("/");
    let arr = [];
    for (let i = pathnameArr.length - 1; i >= 0; i--) {
      let item = pathnameArr.slice(0, i).join("/");
      if (item) arr.push(item);
    }
    this.menuHideLight(pathname, ['/', ...arr]);
  }
  // 监听路由变化
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
    } 
 }
  // 目录点击
  menuClick = ({ key, keyPath }) => {
    this.menuHideLight(key, keyPath.slice(1, keyPath.length));
  }
  // 目录展开关闭
  menuOpen = (openKeys) => {
    this.setState({
      openKeys
    })
  }
  // 设置目高亮
  menuHideLight(selectedKeys, openKeys) {
    this.setState({
      selectedKeys,
      openKeys
    });
  }
  // 检查下级是否都是hideMenu
  checkRoutes(item){
    let Bo = true;
    Object.assign(item.routes).forEach(item => {
      if(!item.hideMenu) Bo = false;
    })
    return Bo ? this.oneLevelMenu(item) : this.childLevelMenu(item);
  }
  // 一级目录
  oneLevelMenu = ({ name, path, icon }) => {
    return (<Menu.Item key={path} icon={icon}>
      <Link className="menuItem" to={path}>{name}</Link>
    </Menu.Item>);
  }
  // 子目录
  childLevelMenu = ({ name, path, routes, icon }) => {
    return (<SubMenu key={path} icon={icon} title={name}>
      {
        routes.map(item => {
          return item.routes && item.routes.length ? this.checkRoutes(item) : this.oneLevelMenu(item);
        })
      }
    </SubMenu>
    )
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <CustomHeader/>
        </Header>
        <Layout style={{ height: '100%' }}>
          <Sider width={250}>
            <Menu mode="inline" theme="light" selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} onOpenChange={this.menuOpen} onClick={this.menuClick} style={{ height: '100%', borderRight: 0 }}>
              {
                Object.assign(routerList[1].routes).map(item => {
                  if (!item.hideMenu) {
                    return item.routes && item.routes.length ? this.checkRoutes(item) : this.oneLevelMenu(item);
                  }
                  return '';
                })
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '16px' }}>
            <div className="breadcrumbBox">
              <CustomBreadcrumb pathname={this.props.location.pathname}/>
            </div>
            {this.routerListRecursion(this.props.routes)}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default Main;