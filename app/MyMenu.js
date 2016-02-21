var React = require('react')
var ReactMotion = require('react-motion') 
var spring = ReactMotion.spring;
var Motion = ReactMotion.Motion;



const Menu = React.createClass({
  getInitialState() {
    return {open: false , options: ['Cold Play', 'Yahoo Inc', 'React Europe', 'Jay Zhou', 'Eason'], selected: 'Cold Play'};
  },
  itemClick(newSelect) {
    console.log(newSelect);
    if (newSelect !== this.state.selected) {
      console.log("new selected");
      this.setState({open: !this.state.open, selected: newSelect});
    }
    this.setState({open: !this.state.open});
  },
  iconClick() {
    this.setState({open: !this.state.open});
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-1 col-md-offset-2">
        <Motion style={{x: spring(this.state.open ? 100 : 0)}}>
          {({x}) =>
            <div className="myMenu">
              <div className="myIcon" onClick={this.iconClick} style={{
                transform: `rotate(${x/2}deg)`, 
                backgroundImage: 'url(' + '/img/music1.png' + ')',  
                backgroundSize: 'contain',
                zIndex: 10,
              }} />
              {this.state.options.map((item, i) => {
                let angle = -45 + i * 35;
                let xcode = x * Math.cos(angle/180*Math.PI);
                let ycode = x * Math.sin(angle/180*Math.PI);
                return (
                  <div key={i} className="myItem" onClick={this.itemClick.bind(null, item)} style={{
                    zIndex: 1,
                    WebkitTransform: `translate3d(${xcode}px, ${ycode}px, 0)`,
                    transform: `translate3d(${xcode}px, ${ycode}px, 0)`,
                  }}></div>
                )
              })}
            </div>
          }
        </Motion>
        </div>
        <div className="col-md-6">{this.state.selected}</div>
      </div>
    );
  },
});
export default Menu;
