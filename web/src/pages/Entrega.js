import React, { Component } from 'react';
import api from '../services/api';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { format } from 'date-fns';


export default class Entrega extends Component {
    state = {
        entregas: [],
      };

 mountTable = (item) => {
    return (     
      <tr  key={String(item.id)}>
        <td>{item.nome_cliente}</td>
        <td>{item.ponto_origem}</td>
        <td>{item.ponto_destino}</td>   
        <td>{item.data_entrega}</td>    
        <td>
        <a  href={`#/mapa/${String(item.id)}`} >
          <i className="fa fa-map-marker" aria-hidden="true"></i>
        </a>
        </td>
    </tr>        
    );
    }


  async loadEntregas() {
      const entregas = await api.get(`/entrega`);
      this.setState({ entregas: entregas.data });
    }

  async componentDidMount() {
    this.loadEntregas();
  }



  render() {
    const { entregas } = this.state;
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Lista de Entregas
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th>Nome Ciente</th>
                  <th>Ponto Origem</th>
                  <th>Ponto Destino</th>
                  <th>Data Entrega</th>
                  <th>Trajeto</th>
                </tr>
                </thead>
                <tbody>
                
                {
                entregas.map(entrega => (                
                  this.mountTable(entrega)
                ))}                     
               </tbody>  

          </Table>

          </CardBody>
          </Card>
          </Col>
          </Row>
          <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <a class="btn btn-primary" href="#nova-entrega" role="button">Novo</a>
              </Col>
          </Row>
    </div>  )   
  }
}