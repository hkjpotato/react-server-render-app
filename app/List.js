import React from 'react';
import {TransitionMotion, spring} from 'react-motion';
const presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};

const VideoList = React.createClass({
  getInitialState() {
    return {
      videos: this.props.data,
      value: '',
    };
  },
  // actual animation-related logic
  getDefaultStyles() {
    return this.state.videos.map(video => ({
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
    const {videos, value} = this.state;
    return videos.map((video, i) => {
      return {
        key: video.key,
        data: video.data,
        style: {
          height: spring(110, presets.gentle),
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
    const {videos, value} = this.state;
    return (
        <div className="row">
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <ul className="video-list" style={{listStyleType: 'none'}}>
                {styles.map(({key, style, data: {isDone, text}}) => {
                  console.log(style)
                  return (
                  <li key={key} style={style}>
                    <div className="view" style={{
                      width: 196,
                      height: 110,
                      backgroundColor: "#ffb6b6",
                      color: "#f2f2f2",
                      boxShadow:`rgba(0, 0, 0, 0.1) 0px 2px 4px 0px`,
                    }}>
                      {text}
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

export default VideoList;
