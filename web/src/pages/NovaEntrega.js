import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import api from '../services/api';
import * as Yup from 'yup';


const schema = Yup.object().shape({
  nome_cliente: Yup.string().required('Campo nome cliente é obrigatório!'),
  tipo_ponto: Yup.string().required('Campo Tipo de Ponto é obrigatório!'),

  ponto_origem_endereco: Yup.string().when("tipo_ponto", {
    is: '1', then: Yup.string().required('Campo Ponto de Origem é obrigatório!')
  }),
  ponto_destino_endereco: Yup.string().when("tipo_ponto", {
    is: '1', then: Yup.string().required('Campo Ponto de Destino é obrigatório!')
  }),
  ponto_origem_latitude: Yup.string().when("tipo_ponto", {
    is: '2', then: Yup.string().required('Campo Latitude de Origem é obrigatório!')
  }),
  ponto_destino_latitude: Yup.string().when("tipo_ponto", {
    is: '2', then: Yup.string().required('Campo Latitude de Destino é obrigatório!')
  }),
  ponto_origem_longitude: Yup.string().when("tipo_ponto", {
    is: '2', then: Yup.string().required('Campo Longitude de Origem é obrigatório!')
  }),
  ponto_destino_longitude: Yup.string().when("tipo_ponto", {
    is: '2', then: Yup.string().required('Campo Longitude de Destino é obrigatório!')
  }),

  data_entrega: Yup.string().required('Campo Data de entrega é obrigatório!'),
});

const validate = (schema, data) => {
  return schema.validate(data, { abortEarly: false })
    .then(_ => {
      return true;
    }).catch(err => {
      err.inner.map(item => {
        return toast.error(item.message, {
          position: toast.POSITION.TOP_CENTER
        });
      });
      return false;
    })
}


toast.configure();


class NovaEntrega extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      nome_cliente: '',
      ponto_origem_enderco: '',
      ponto_destino_endereco: '',
      ponto_origem_longitude: '',
      ponto_origem_latitude: '',
      ponto_destino_longitude: '',
      ponto_destino_latitude: '',
      data_entrega: '',
      tipo_ponto: '',
    };
  }



  clearState() {
    this.setState({
      nome_cliente: '',
      ponto_origem_enderco: '',
      ponto_destino_endereco: '',
      ponto_origem_longitude: '',
      ponto_origem_latitude: '',
      ponto_destino_longitude: '',
      ponto_destino_latitude: '',
      data_entrega: '',
      tipo_ponto: '',
    });

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { nome_cliente, ponto_origem_endereco, ponto_destino_endereco,
      ponto_origem_longitude, ponto_origem_latitude,
      ponto_destino_longitude, ponto_destino_latitude, data_entrega, tipo_ponto } = this.state;
    let ponto_origem, ponto_destino;
    let isValid = false;


    isValid = await validate(schema, {
      nome_cliente, tipo_ponto, ponto_origem_endereco, ponto_destino_endereco, ponto_origem_latitude,
      ponto_destino_latitude,
      ponto_origem_longitude,
      ponto_destino_longitude, data_entrega
    });



    if (isValid) {
      try {
        if (tipo_ponto === '1') {
          ponto_origem = ponto_origem_endereco;
          ponto_destino = ponto_destino_endereco;
        } else if (tipo_ponto === '2') {
          ponto_origem = ponto_origem_latitude + "," + ponto_origem_longitude;
          ponto_destino = ponto_destino_latitude + "," + ponto_destino_longitude;
        }

        await api.post(`/entrega`, { nome_cliente, ponto_origem, ponto_destino, data_entrega });
        toast.success("Cadastro Realizado com sucesso !", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push(`/entrega`);
      } catch (error) {
        toast.error(error.response.data.error.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeRadio(event) {
    this.setState({ tipo_ponto: event.currentTarget.value });
  }

  render() {
    const { nome_cliente, ponto_origem_endereco, ponto_destino_endereco,
      ponto_origem_longitude, ponto_origem_latitude,
      ponto_destino_longitude, ponto_destino_latitude, data_entrega, tipo_ponto } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="10">
            <Card>
              <CardHeader>
                <strong>Cadastro</strong>
              </CardHeader>
              <CardBody>
                <Form schema={schema} onSubmit={this.handleSubmit} className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <Label htmlFor="nome_cliente">Nome Cliente</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={nome_cliente} onChange={this.handleChange} id="nome_cliente" name="nome_cliente" placeholder="Nome Cliente" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <Label htmlFor="tipo_ponto">Tipo de Ponto</Label>

                      <FormGroup check>
                        <Label check>
                          <Input type="radio" id="tipo_endereco" onChange={this.handleChangeRadio} checked={tipo_ponto === '1' ? true : false} value='1' name="tipo_ponto" />{' '}
                          Endereço
                      </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" id="tipo_coordenada" onChange={this.handleChangeRadio} checked={tipo_ponto === '2' ? true : false} value='2' name="tipo_ponto" />{' '}
                          Coordenadas
                      </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  {tipo_ponto === '1' ? [
                    <FormGroup row key="ponto_origem_endereco">
                      <Col xs="12" md="9">
                        <Label htmlFor="ponto_origem_endereco">Endereço Origem</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_origem_endereco} onChange={this.handleChange} id="ponto_origem_endereco" name="ponto_origem_endereco" placeholder="Endereço Origem" />
                      </Col>
                    </FormGroup>,

                    <FormGroup row key="ponto_destino_endereco">
                      <Col xs="12" md="9">
                        <Label htmlFor="ponto_destino_endereco">Endereço Destino</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_destino_endereco} onChange={this.handleChange} id="ponto_destino_endereco" name="ponto_destino_endereco" placeholder="Endereço Destino" />
                      </Col>
                    </FormGroup>
                  ] : null}



                  {tipo_ponto === '2' ? [
                    <FormGroup row key="ponto_origem">
                      <Col xs="12" md="9">
                        <Label htmlFor="ponto_origem_longitude">Coordenadas de  Origem</Label>
                      </Col>

                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_origem_latitude} onChange={this.handleChange} id="ponto_origem_latitude" name="ponto_origem_latitude" placeholder="Latitude de Origem" />
                      </Col>

                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_origem_longitude} onChange={this.handleChange} id="ponto_origem_longitude" name="ponto_origem_longitude" placeholder="Longitude de Origem" />
                      </Col>


                    </FormGroup>,


                    <FormGroup row key="ponto_destino">
                      <Col xs="12" md="9">
                        <Label htmlFor="ponto_destino">Coordenadas de  Destino</Label>
                      </Col>

                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_destino_latitude} onChange={this.handleChange} id="ponto_destino_latitude" name="ponto_destino_latitude" placeholder="Latitude de Destino" />
                      </Col>

                      <Col xs="12" md="9">
                        <Input type="text" value={ponto_destino_longitude} onChange={this.handleChange} id="ponto_destino_longitude" name="ponto_destino_longitude" placeholder="Longitude de Destino" />
                      </Col>

                    </FormGroup>,


                  ] : null}

                  <FormGroup row>
                    <Col xs="12" md="9">
                      <Label htmlFor="data_entrega">Data Entrega</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" value={data_entrega} onChange={this.handleChange} id="data_entrega" name="data_entrega" placeholder="date" />
                    </Col>
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Enviar</Button>


                </Form>

              </CardBody>
              <CardFooter>
                <Button onClick={this.clearState} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NovaEntrega;
