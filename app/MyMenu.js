import React from 'react';
import ReactDOM from 'react-dom';
import {TransitionMotion, spring, Motion} from 'react-motion'

//this element only has 1 state: open?
export default class MyToggle extends React.Component {
  constructor(props) {
    super(props);
    this.itemClick = this.itemClick.bind(this);
    this.iconClick = this.iconClick.bind(this);
    this.state = {open: false};
  }

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
  }

  iconClick() {
    //TODO: at this moment, simply close the menu, may add play video function later
    this.setState({open: !this.state.open});
  }

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
                    zIndex: 9,
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
  }
}


// MeMenu.propTypes = {
//   checked: React.PropTypes.bool
// }

// MeMenu.defaultProps = {
//   checked : false
// }
