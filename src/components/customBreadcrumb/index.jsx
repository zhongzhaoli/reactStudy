import React from 'react';
import { Breadcrumb } from 'antd';
import routerList from '../../router/routerList';
import { HomeOutlined } from '@ant-design/icons';

class customBreadcrumb extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breadcrumbArr: []
    }
  }
  componentWillMount(){
    const pathname = this.props.pathname;
    let pathnameArr = pathname.split('?')[0].split('/');
    this.breadcrumbRecursion(routerList, pathnameArr, 0);
  }
  breadcrumbRecursion(list, pathnameArr, findNum){
    if(findNum > pathnameArr.length - 1) return;
    list.forEach(item => {
      if(item.path === `${findNum ? "" : "/"}${pathnameArr.slice(0, findNum + 1).join("/")}`){
        let arr = this.state.breadcrumbArr;
        arr.push(item);
        this.setState({
          breadcrumbArr: arr
        })
        this.breadcrumbRecursion(item.routes, pathnameArr, ++findNum);
      }
    })
  }
  render(){
    const arr = this.state.breadcrumbArr;
    return <Breadcrumb>
      {
        arr.map((item, key) => {
          return <Breadcrumb.Item key={key}>
            <span>{item.name ? item.name : <HomeOutlined />}</span>
          </Breadcrumb.Item>
        })
      }
    </Breadcrumb>;
  }
}

export default customBreadcrumb;