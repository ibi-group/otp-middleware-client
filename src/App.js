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

      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Ebenezer+United+Methodist+Church%3A%3A28.515499%2C-81.396418&toPlace=AMTRAK-Orlando%3A%3A28.52504%2C-81.3816&mode=BICYCLE%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Ebenezer+United+Methodist+Church%3A%3A28.515499%2C-81.396418&toPlace=AMTRAK-Orlando%3A%3A28.52504%2C-81.3816&mode=BICYCLE_RENT%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Ebenezer+United+Methodist+Church%3A%3A28.515499%2C-81.396418&toPlace=AMTRAK-Orlando%3A%3A28.52504%2C-81.3816&mode=CAR_HAIL%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Ebenezer+United+Methodist+Church%3A%3A28.515499%2C-81.396418&toPlace=AMTRAK-Orlando%3A%3A28.52504%2C-81.3816&mode=WALK%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",

      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Baldwin+Fairchild+Funeral+Home%3A%3A28.587161%2C-81.36496&toPlace=Kaley+Elementary+School%3A%3A28.520319%2C-81.358521&mode=BICYCLE%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Baldwin+Fairchild+Funeral+Home%3A%3A28.587161%2C-81.36496&toPlace=Kaley+Elementary+School%3A%3A28.520319%2C-81.358521&mode=BICYCLE_RENT%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Baldwin+Fairchild+Funeral+Home%3A%3A28.587161%2C-81.36496&toPlace=Kaley+Elementary+School%3A%3A28.520319%2C-81.358521&mode=CAR_HAIL%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Baldwin+Fairchild+Funeral+Home%3A%3A28.587161%2C-81.36496&toPlace=Kaley+Elementary+School%3A%3A28.520319%2C-81.358521&mode=WALK%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",

      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Dubsdread+Golf+Course%3A%3A28.58205%2C-81.38743&toPlace=Orwin+Manor%3A%3A28.578752%2C-81.363782&mode=BICYCLE%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Dubsdread+Golf+Course%3A%3A28.58205%2C-81.38743&toPlace=Orwin+Manor%3A%3A28.578752%2C-81.363782&mode=BICYCLE_RENT%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Dubsdread+Golf+Course%3A%3A28.58205%2C-81.38743&toPlace=Orwin+Manor%3A%3A28.578752%2C-81.363782&mode=CAR_HAIL%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3",
      "https://fdot-otp-server.ibi-transit.com/otp/routers/default/plan?fromPlace=Dubsdread+Golf+Course%3A%3A28.58205%2C-81.38743&toPlace=Orwin+Manor%3A%3A28.578752%2C-81.363782&mode=WALK%2CBUS%2CRAIL&showIntermediateStops=true&maxWalkDistance=1609&optimize=QUICK&walkSpeed=1.34&ignoreRealtimeUpdates=true&numItineraries=3"
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
