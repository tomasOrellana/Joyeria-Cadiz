import React from 'react';
import input from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {  Transfer,
          Form,
          Input,
          Button,
          Radio,
          Select,
          Cascader,
          DatePicker,
          InputNumber,
          TreeSelect,
          Switch  } from 'antd';
import { Grid } from '@material-ui/core';


export default class Ventas extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      ready: false,
      ListaProductos: "",
      descuento: '',
      metodo_pago: 'efectivo',
      vendedor: '',
      sucursal: '0',
      total: 0,
      indexMetodo: 0,
      indexSucursal: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.ActualizarInventario = this.ActualizarInventario.bind(this)
  }

  ActualizarInventario() {
    fetch('/productos')
      .then(res => {
          console.log(res);
          return res.json()
      })
      .then(users => {
          this.setState({ListaProductos: users, ready: true})
          this.getMock();
      });
  }

  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.ActualizarInventario()
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.ListaProductos.length; i++) {
      const data = {
        key: this.state.ListaProductos[i],
        title: `${this.state.ListaProductos[i].tipo} ${this.state.ListaProductos[i].material} ${this.state.ListaProductos[i].descripcion} ${this.state.ListaProductos[i].piedra} $${this.state.ListaProductos[i].precio}`,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  CalcularTotal = () => {
    let tot = 0;
    for(let i = 0; i<this.state.targetKeys.length;i++) {
      tot = tot + this.state.targetKeys[i].precio;
    }
    this.setState({total:tot})
  }

  handleChange = targetKeys => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.CalcularTotal();
      }, 300)
      this.setState({ targetKeys });
    })
  };

  renderFooter = () => (
    <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
      Actualizar
    </Button>
  );


  imprimir = () => {
    console.log('descuento: ' + this.state.descuento)
    console.log('metodo: ' + this.state.metodo_pago)
    console.log('vendedor: ' + this.state.vendedor)
    console.log('sucursal: ' + this.state.sucursal)
    console.log('total: ' + this.state.total)
    console.log(this.state.targetKeys)
  }


  render() {
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 style={{ color: "#FFFFFF",marginTop: "0px",minHeight: "auto",fontWeight: "300",fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",marginBottom: "3px",textDecoration: "none"}}>Crear venta</h4>
          </CardHeader>
          <CardBody>
            <Transfer
              dataSource={this.state.mockData}
              showSearch
              pagination
              listStyle={{
                width: 500,
                height: 300,
              }}
              operations={['Incluir', 'Descartar']}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              render={item => `${item.title}`}
            />
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}>
              <Grid item xs={6}>
                Precio total: {this.state.total}
              </Grid>
              <Grid item xs={6}>
                <input value={this.state.descuento} label="Descuento %" onChange={ this.handleChange }/>
                <select value={this.state.metodo_pago} onChange={this.handleChange}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Debito">Debito</option>
                  <option value="Credito">Credito</option>
                </select>
                <input id="VendedorId" value={this.state.vendedor} label="Vendedor" onChange={ this.handleChange }/>
                <select value={this.state.sucursal} onChange={this.handleChange}>
                  <option value="0">Lo Castillo</option>
                  <option value="1">Apumanque</option>
                  <option value="2">Vitacura</option>
                </select>
                <Button style={{ float: 'right', margin: 5 }} onClick={this.imprimir}>
                  Finalizar venta
                </Button>
              </Grid>
            </Grid>

          </CardBody>
        </Card>
      </div>
    );
  }
}
