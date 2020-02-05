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
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import api from '../services/api';
import * as Yup from 'yup';

 
const schema = Yup.object().shape({
    nome_cliente: Yup.string().required('Campo nome cliente é obrigatório!'),
    ponto_origem: Yup.string().required('Campo Ponto de Origem é obrigatório!'),
    ponto_destino: Yup.string().required('Campo Ponto de Destino é obrigatório!'),
    data_entrega: Yup.string().required('Campo Data de entrega é obrigatório!'),
  });

  const validate = (schema, data) => {
    return schema.validate(data, { abortEarly: false })
      .then(_ => {
          return true;
      }).catch(err => {
        err.inner.map(item => {
            toast.error(item.message, {
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

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      nome_cliente:'',
      ponto_origem:'', 
      ponto_destino:'', 
      data_entrega:''
    };
  }

 

    clearState(){
        this.setState({     
        nome_cliente:'',
        ponto_origem:'', 
        ponto_destino:'', 
        data_entrega:''});

    }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  async handleSubmit (event)  {
        event.preventDefault();
        const { nome_cliente, ponto_origem, ponto_destino, data_entrega } = this.state;
        const isValid = await validate(schema,{ nome_cliente, ponto_origem, ponto_destino, data_entrega })
      
       if(isValid){
            try {
                await api.post(`/entrega`, { nome_cliente, ponto_origem, ponto_destino, data_entrega } );
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
        this.setState({[event.target.name]: event.target.value});
    }

  render() {
      const { nome_cliente, ponto_origem, ponto_destino, data_entrega } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Cadastro</strong> 
              </CardHeader>
              <CardBody>
                <Form schema={schema} onSubmit={this.handleSubmit} className="form-horizontal">

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="nome_cliente">Nome Cliente</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={nome_cliente} onChange={this.handleChange} id="nome_cliente" name="nome_cliente" placeholder="Nome Cliente" />
                      <FormText color="muted">Nome Cliente</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="ponto_origem">Ponto Origem</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={ponto_origem}  onChange={this.handleChange} id="ponto_origem" name="ponto_origem" placeholder="Ponto Origem" />
                      <FormText color="muted">Ponto Origem</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="ponto_destino">Ponto Destino</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"  value={ponto_destino} onChange={this.handleChange} id="ponto_destino" name="ponto_destino" placeholder="Ponto Destino" />
                      <FormText color="muted">Ponto Destino</FormText>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="data_entrega">Data Entrega</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date"  value={data_entrega} onChange={this.handleChange}  id="data_entrega" name="data_entrega" placeholder="date" />
                    </Col>
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Enviar</Button>
                  <Button onClick={this.clearState} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Limpar</Button>
                </Form>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NovaEntrega;
