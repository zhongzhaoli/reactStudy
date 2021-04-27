import { lazy } from 'react';

const routerList = [
  {
    path: "/login",
    name: "登录",
    exact: true,
    hideMenu: true,
    component: lazy(() => import('../page/login/index')),
  },
  {
    path: "/",
    name: "首页",
    component: lazy(() => import('../page/main/index')),
    routes: [
      {
        path: "/user",
        name: "用户管理",
        exact: true,
        component: lazy(() => import('../page/user/index')),
        routes: [
          {
            path: "/user/userList",
            name: "用户列表",
            exact: true,
            component: lazy(() => import('../page/user/userList/index')),
            routes: [
              {
                path: "/user/userList/userDetail",
                name: "用户详情",
                exact: true,
                hideMenu: true,
                component: lazy(() => import('../page/user/userList/userDetail/index')),
              },
              {
                path: "/user/userList/userAdd",
                name: "用户添加",
                exact: true,
                hideMenu: true,
                component: lazy(() => import('../page/user/userList/userAdd/index')),
              }
            ]
          }
        ]
      },
      {
        path: "/order",
        name: "订单管理",
        exact: true,
        component: lazy(() => import('../page/order/index')),
        routes: [
          {
            path: "/order/orderList",
            name: "订单列表",
            exact: true,
            component: lazy(() => import('../page/order/orderList/index')),
          }
        ]
      },
    ]
  }
]
export default routerList;