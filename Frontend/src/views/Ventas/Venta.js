import React from 'react';
import MaterialTable from 'material-table';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {  Transfer, Button  } from 'antd';

export default class Ventas extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      ready: false,
      ListaProductos: null
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
          console.log(this.state.ListaProductos)
          console.log(this.state.ListaProductos.length)
          console.log(this.state.ListaProductos[5].tipo)
          console.log(this.state.ListaProductos[5].piedra)
          console.log(this.state.ListaProductos[5].precio)
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
        key: this.state.ListaProductos[i]._id,
        title: `${this.state.ListaProductos[i]._id} ${this.state.ListaProductos[i].tipo} ${this.state.ListaProductos[i].material} ${this.state.ListaProductos[i].descripcion} ${this.state.ListaProductos[i].piedra} $${this.state.ListaProductos[i].precio}`,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  renderFooter = () => (
    <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
      Actualizar
    </Button>
  );

  imprimir = () => {
    console.log(this.state.targetKeys)
    for(let i = 0; i < this.state.targetKeys.length;i++) {
      console.log(this.state.ListaProductos[i])
    }
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
            <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.imprimir}>
              prueba
            </Button>
          </CardBody>
        </Card>
      </div>
    );

  }
}
