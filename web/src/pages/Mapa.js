import React, { Component } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import api from '../services/api';
import Map from '../components/Map';
const googleMapsApiKey = "AIzaSyCTazkvoxstGNN-N6cg8OSlDkUH1JQKuLQ";


export default class Entrega extends Component {

  state = {
    entrega: null,
  };

  async loadEntrega() {
    const { id } = this.props.match.params;
    const response = await api.get(`/entrega/${id}`);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const compareDate = utcToZonedTime(response.data.data_entrega, timezone);
    const entrega = {
      ...response.data,
      data_entrega_formatada: format(compareDate, "dd/MM/Y", {
        locale: pt,
      }),
    };

    this.setState({ entrega });
  }

  async componentDidMount() {
    this.loadEntrega();
  }



  render() {
    let { entrega } = this.state;

    return (
      entrega != null ? [
        <label><b> Entrega do Cliente {entrega.nome_cliente}
          <br /> Data {entrega.data_entrega_formatada}</b></label>,
        <Map key="Map"
          googleMapURL={
            'https://maps.googleapis.com/maps/api/js?key=' +
            googleMapsApiKey +
            '&libraries=geometry,drawing,places'
          }
          origin={entrega.ponto_origem}
          destination={entrega.ponto_destino}
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={<div style={{ height: "80vh" }} />}
          mapElement={<div style={{ height: `80%` }} />}
          defaultCenter={{ lat: -22.9035, lng: -43.2096 }}
          defaultZoom={11}
        />] : null
    )
  }
}
