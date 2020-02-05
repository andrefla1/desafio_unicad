import React, { Component } from 'react';
import api from '../services/api';
import {  GoogleApiWrapper } from 'google-maps-react';
import Map from '../services/Map';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

let places = [];
const googleMapsApiKey = "AIzaSyCTazkvoxstGNN-N6cg8OSlDkUH1JQKuLQ";


class Entrega extends Component {


    async loadEntrega() {
      const { id } = this.props.match.params;
      const entrega = await api.get(`/entrega/${id}`);
      places.push(entrega.data.ponto_origem);
      places.push(entrega.data.ponto_destino);

    }

  async componentDidMount() {
    this.loadEntrega();
  }



  render() {
      return (
        <Map
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=' +
          googleMapsApiKey +
          '&libraries=geometry,drawing,places'
        }
        markers={places}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: "80vh"}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        defaultCenter={ {lat: 25.798939, lng: -80.291409}}
        defaultZoom={11}
      />
      )
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCTazkvoxstGNN-N6cg8OSlDkUH1JQKuLQ'
  })(Entrega);


