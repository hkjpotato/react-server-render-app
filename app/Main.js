var React = require('react')
var ReactDOM = require('react-dom')
var ReactMotion = require('react-motion') 
import {TransitionMotion, spring, Motion} from 'react-motion'

var isNode = typeof module !== 'undefined' && module.exports;

const presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};

//this element only has 1 state: open?
const MyMenu = React.createClass({
  getInitialState() {
    return {
      open: false , 
    };
  },
  itemClick(newSelect) {
    console.log(newSelect);
    if (newSelect !== this.props.selected) {
      console.log("new selected");
      //call the parent's handler to deal with global state change
      this.props.selectChange(newSelect);
    }
    //deal with private state: open or not
    console.log("deal with private state");
    this.setState({
      open: !this.state.open
    });
  },
  iconClick() {
    //TODO: at this moment, simply close the menu, may add play video function later
    this.setState({open: !this.state.open});
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-2 col-md-offset-1">
        <Motion style={{x: spring(this.state.open ? 100 : 0)}}>
          {({x}) =>
            <div className="myMenu">
              <div className="myIcon" onClick={this.iconClick} style={{
                transform: `rotate(${x/2}deg)`, 
                backgroundImage: 'url(' + '/img/music1.png' + ')',  
                backgroundSize: 'contain',
                zIndex: 10,
              }} />
              {this.props.options.map((item, i) => {
                let angle = -45 + i * 35;
                let xcode = x * Math.cos(angle/180*Math.PI);
                let ycode = x * Math.sin(angle/180*Math.PI);
                return (
                  <div key={i} className="myItem" onClick={this.itemClick.bind(null, item)} style={{
                    zIndex: 1,
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    fontSize: '80%',
                    fontWeight: 400,
                    WebkitTransform: `translate3d(${xcode}px, ${ycode}px, 0)`,
                    transform: `translate3d(${xcode}px, ${ycode}px, 0)`,
                  }}>{item.charAt(0)}</div>
                )
              })}
            </div>
          }
        </Motion>
        </div>
        <div className="col-md-9" style={{paddingLeft: 0}}>{this.props.selected}</div>
      </div>
    );
  },
});

const VideoList = React.createClass({
  //This is a stateless UI element, no need for state, just render by props
  // actual animation-related logic
  getDefaultStyles() {
    return this.props.videos.map(video => ({
      key: video.key,
      data: video.data,
      style: {
        height: 0, 
        opacity: 0,
        marginTop: 0,
      }
    }));
  },

  getStyles() {
    const {videos} = this.props;
    return videos.map((video, i) => {
      return {
        key: video.key,
        data: video.data,
        style: {
          height: spring(115, presets.gentle),
          opacity: spring(1, presets.gentle),
          marginTop: spring(10, presets.gentle),
        }
      };
    });
  },

  willEnter(param) {
    return {
      height: 0,
      opacity: 0,
      marginTop: 0
    };
  },

  willLeave() {
    return {
      height: 0,
      opacity: 0,
      marginTop: 0,
    };
  },
  render() {
    const {videos} = this.props;
    return (
        <div>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <ul className="video-list" style={{
                listStyleType: 'none',
                paddingLeft: 0,
              }}>
                {styles.map(({key, style, data: {videoTitle, imgURL}}) => {
                  return (
                  <li key={key} style={style}>
                    <div className="view" style={{
                      height: 115,
                      width: 196,
                      backgroundColor: "#e5e5e5",
                      color: "#f2f2f2",
                      boxShadow:`rgba(0, 0, 0, 0.1) 0px 2px 4px 0px`,
                    }}>
                    <div className="caption" style={{
                        width:196,
                        height:115,
                        position:'absolute',
                        zIndex: 2,
                      }}>
                          <div className="caption-content">
                              <a href={"https://www.youtube.com/watch?v="+key} target="_blank" style={{
                                color: 'white',
                                zIndex: 3,
                                textDecoration: 'none',
                              }}><p>{videoTitle}</p></a>
                          </div>
                      </div>

                      <img src={imgURL} alt={videoTitle} className="img-responsive" style={{
                        position: 'absolute',
                        margin: 5,
                        width: 186,
                        height: 105,
                      }}/>
                    </div>
                  </li>
                  )
                }
                )}
              </ul>
            }
          </TransitionMotion>
        </div>
    );
  },
});


//the main app
//the main app has two states at this moment
//1. selected: which menu is selected
//2. the corresponding data
const MyApp = React.createClass({
  getInitialState: function () {
    return {
      selected: this.props.initProps.selected,
      listData: this.props.initProps.listData
    };
  },
  componentDidMount: function () {
    console.log("on the client");
  },
  componentWillUnmount: function() {
    console.log("unmount the component");
  },
  handleMenuSelectChange: function(newSelect) {
    console.log("this is handler of the parent App",newSelect);
    //client side update:make ajax call to fetch data from the server and then reset the state
    $.get('/'+newSelect, function(result) {
        this.setState({
          selected: newSelect,
          listData: JSON.parse(result)
        });
    }.bind(this));
  },
  render: function() {
    return (
      <div className="container" style={{width:600, margin: '80px auto'}}>
        <MyMenu options={this.props.initProps.options} selected={this.state.selected} selectChange={this.handleMenuSelectChange}/>
        <div className="row">
          <div className="col-md-offset-3">
            <VideoList videos={this.state.listData}/>
          </div>
        </div>
      </div>
    )
  }
});


if (isNode) {
  console.log("In node, there are two situations in my app:\n1.when the server.js render the react-component by calling createFactory method.\n2.when the webpack compile this file to bundle.js. This is why you can see this comment on the browser side");
  module.exports.MyApp = MyApp;
} 

if (typeof window !== 'undefined') {
  console.log("Now we are in the browser side and start the client render.\nReact won't render an exisiting element with same props rendered by server.\nNotice I stringify and pass the same props from the server to the browser side");
  ReactDOM.render(<MyApp initProps={window.INITIAL_PROPS}/>, document.querySelector('#react-root'));
}

   


