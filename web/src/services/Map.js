/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  DirectionsRenderer
} from "react-google-maps";

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null
  };

  async componentDidMount() {
    const { places, travelMode } = this.props;
    const origin = places[0];
    const destination = places[1];

    const directionsService = new google.maps.DirectionsService();

    // melhor trajeto entre os pontos evitando barcas, pontes e rodovias
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        avoidFerries: true,
        avoidHighways: true,
        avoidTolls: true,
        drivingOptions:
          { 
            trafficModel: google.maps.TrafficModel.OPTIMISTIC, 
            departureTime: new Date(Date.now() ),
          } 
         ,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }
  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      <MapDirectionsRenderer
        places={props.markers}
        // Melhor Trajeto independente de  condução
        travelMode={google.maps.TravelMode.TRANSIT}
        //Melhor trajeto no modo direção
        //travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;
