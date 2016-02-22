import React from 'react';
import ReactDOM from 'react-dom';
import {TransitionMotion, spring, Motion} from 'react-motion'
import MyMenu from './Mymenu'
import MyVideoList from './MyVideoList'


var isNode = typeof module !== 'undefined' && module.exports;

//the main app
//the main app has two states at this moment
//1. selected: which menu is selected
//2. the corresponding data
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuSelectChange = this.handleMenuSelectChange.bind(this);
    this.state = {
      selected: this.props.initProps.selected,
      listData: this.props.initProps.listData
    };
  }
  
  componentDidMount() {
    console.log("on the client");
  }

  componentWillUnmount() {
    console.log("unmount the component");
  }

  handleMenuSelectChange(newSelect) {
    console.log("this is handler of the parent App",newSelect);
    //client side update:make ajax call to fetch data from the server and then reset the state
    $.get('/'+newSelect, function(result) {
        this.setState({
          selected: newSelect,
          listData: JSON.parse(result)
        });
    }.bind(this));
  }

  render() {
    return (
      <div className="container" style={{width:600, margin: '80px auto'}}>
        <MyMenu options={this.props.initProps.options} selected={this.state.selected} selectChange={this.handleMenuSelectChange}/>
        <div className="row">
          <div className="col-md-offset-3">
            <MyVideoList videos={this.state.listData}/>
          </div>
        </div>
      </div>
    )
  }
}


if (isNode) {
  console.log("In node, there are two situations in my app:\n1.when the server.js render the react-component by calling createFactory method.\n2.when the webpack compile this file to bundle.js. This is why you can see this comment on the browser side");
  module.exports.MyApp = MyApp;
} 

if (typeof window !== 'undefined') {
  console.log("Now we are in the browser side and start the client render.\nReact won't render an exisiting element with same props rendered by server.\nNotice I stringify and pass the same props from the server to the browser side");
  ReactDOM.render(<MyApp initProps={window.INITIAL_PROPS}/>, document.querySelector('#react-root'));
}

   


