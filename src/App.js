import React from 'react';
import Messages from './Messages';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      browserMessages: [],
      middlewareMessages: [],
      appliedWsUrl: null,
      wsUrl: 'ws://localhost:4567/async-websocket'
    };
  }

  handleChange = event => {
    const state = Object.assign(this.state);
    this.setState({...state, wsUrl: event.target.value});
  }

  connectViaBrowser = () => {
    const numItineraries = 3;
      
    // Play with some HTTP requests
    const urls = [
      // Each request made individually below from OTP MOD UI
      // in reality is actually two requests, one with and one without realtime updates.
      // We are sending only one such request in this trial.

      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=WALK%2CBUS%2CTRAM%2CRAIL%2CGONDOLA&showIntermediateStops=true&maxWalkDistance=1207&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BUS%2CTRAM%2CRAIL%2CGONDOLA%2CBICYCLE&showIntermediateStops=true&maxWalkDistance=4828&maxBikeDistance=4828&optimize=SAFE&bikeSpeed=3.58&ignoreRealtimeUpdates=true&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BUS%2CTRAM%2CRAIL%2CGONDOLA%2CBICYCLE_RENT&showIntermediateStops=true&maxWalkDistance=4828&maxBikeDistance=4828&optimize=SAFE&bikeSpeed=3.58&ignoreRealtimeUpdates=true&companies=BIKETOWN&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BUS%2CTRAM%2CRAIL%2CGONDOLA%2CMICROMOBILITY_RENT&showIntermediateStops=true&optimize=QUICK&maxWalkDistance=4828&maxEScooterDistance=4828&ignoreRealtimeUpdates=true&companies=BIRD%2CLIME%2CRAZOR%2CSHARED%2CSPIN&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BUS%2CTRAM%2CRAIL%2CGONDOLA%2CCAR_PARK%2CWALK&showIntermediateStops=true&optimize=QUICK&ignoreRealtimeUpdates=true&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BUS%2CTRAM%2CRAIL%2CGONDOLA%2CCAR_HAIL%2CWALK&showIntermediateStops=true&optimize=QUICK&ignoreRealtimeUpdates=true&companies=UBER&minTransitDistance=50%25&searchTimeout=10000&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=WALK&showIntermediateStops=true&walkSpeed=1.34&ignoreRealtimeUpdates=true&companies=UBER&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BICYCLE&showIntermediateStops=true&optimize=SAFE&bikeSpeed=3.58&ignoreRealtimeUpdates=true&companies=UBER&numItineraries=" + numItineraries,
      "https://maps.trimet.org/otp_mod/plan?fromPlace=1610%20SW%20Clifton%20St%2C%20Portland%2C%20OR%2C%20USA%2097201%3A%3A45.51091832390635%2C-122.69433801297359&toPlace=3335%20SE%2010th%20Ave%2C%20Portland%2C%20OR%2C%20USA%2097202%3A%3A45.49912810913339%2C-122.656202229323&mode=BICYCLE_RENT&showIntermediateStops=true&optimize=SAFE&bikeSpeed=3.58&ignoreRealtimeUpdates=true&companies=UBER&numItineraries=" + numItineraries
    ];

    const startTime = new Date();

    console.log(startTime.valueOf());

    for (let ii = 0; ii < urls.length; ii++) {
      const i = ii;
      fetch(urls[i])
      .then(res => {
        if (!res.ok) {
          console.log(res.statusText);
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        const thisFinish = new Date();
        // const response = res.json(); // TODO: Do something with the response!
        const time = thisFinish.valueOf() - startTime.valueOf();
        console.log(`Response ${i} received in ${time} ms.`);

        const newState = Object.assign(this.state);
        this.setState({
          ...newState,
          browserMessages: (newState.browserMessages || []).concat([
            {
              data: <span>Response {i} received in {time} ms. (<a href={urls[i]}>URL</a>)</span>
            }
          ]),
          browserTime: thisFinish.valueOf() - startTime.valueOf()
        });
      })
      .catch(error => {
        console.log(`fetch() error: ${error} for ${urls[i]}`);
      });
    }  
  }

  connectViaMiddleware = () => {
    const { wsUrl } = this.state;
    this.setState({ ...this.state, middlewareMessages : [] });

    this.connection = new WebSocket(wsUrl);

    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      const state = Object.assign(this.state);
      this.setState({
        ...state,
        middlewareMessages : state.middlewareMessages.concat([
          {
            data: evt.data
          }
        ])
      })
    };  
  }

  render() {
    const { wsUrl, browserMessages, browserTime, middlewareMessages } = this.state;
    
    return (
      <div className="App">
          <h1>Demo: Multiple OTP Requests From the Browser.</h1>
          <p><button onClick={this.connectViaBrowser}>Connect</button></p>
          <Messages messages={browserMessages} />
          <p>Total time: {browserTime} ms.</p>

          <h1>Demo: OTP Middleware Request From WebSocket</h1>
          
          <p>Web Socket URL:
          <input value={wsUrl} onChange={this.handleChange} />
          <button onClick={this.connectViaMiddleware}>Connect</button>
          </p>
          <Messages messages={middlewareMessages} />
      </div>
    )
  };
}
