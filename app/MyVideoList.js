import React from 'react';
import ReactDOM from 'react-dom';
import {TransitionMotion, spring, Motion} from 'react-motion'

//Prsets for spring parameters
const presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  mySpring: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};

export default class MyVideoList extends React.Component {
  //This is a stateless UI element, no need for state, just render by props
  // actual animation-related logic
  constructor(props) {
    super(props);
  }

  getDefaultStyles() {
  	console.log(this);
    return this.props.videos.map(video => ({
      key: video.key,
      data: video.data,
      style: {
        height: 0, 
        opacity: 0,
        marginTop: 0,
      }
    }));
  }

  getStyles() {
    const {videos} = this.props;
    return videos.map((video, i) => {
      return {
        key: video.key,
        data: video.data,
        style: {
          height: spring(115, presets.mySpring),
          opacity: spring(1, presets.mySpring),
          marginTop: 10,
        }
      };
    });
  }

  willEnter(param) {
    return {
      height: 0,
      opacity: 0,
      marginTop: 10
    };
  }

  willLeave() {
    return {
      height: 0,
      opacity: 0,
      marginTop: 10,
    };
  }

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
  }
}

