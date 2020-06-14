import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from "components/Table/TableInv.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import { Input } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  picker: {
    height: 50
  },
  formControl: {
    marginHorizontal: 10,
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: 20,
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  botonera: {
    marginRight: "auto",
    marginLeft: 20,
    marginBottom: 10
  },
  botonañadir: {
    width: 150,
  },
  añadirestilo: {
    margin: 'auto',
    marginBottom:20,
  },
  formañadir: {
    marginLeft: 5,
    marginRight: 5
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default class InventarioTableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      estado: 0,
      ListaPedidos: null,
      sucursal : null,
      ready: false,
      numero: null,
      estado2: null,
      fecha : null,
      cliente : null,
      total : null,
      descripcion: null

    }
    this.handleChange = this.handleChange.bind(this)
    this.MostrarNuevoMenu = this.MostrarNuevoMenu.bind(this)
    this.AgregarPedido = this.AgregarPedido.bind(this)
  }
//
  componentDidMount() {
    fetch('/productos')
      .then(res => {
          console.log(res);
          return res.json()
      })
      .then(users => {
          this.setState({ListaPedidos: users, ready: true})
      });
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
  }

  actualizarTexto(event, id, value) {
    this.setState({id: value});
  }

  MostrarNuevoMenu() {
    if(this.state.estado === 0) this.setState({estado: 1})
    if(this.state.estado === 1) this.setState({estado: 0})
  }

  AgregarPedido() {
    console.log(this.state.tabIndex)
    fetch('/agregar_pedido', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      numero: this.state.numero,
      fecha: this.state.fecha,
      estado: this.state.estado2,
      total: this.state.total,
      cliente: this.state.cliente,
      descripcion: this.state.descripcion,
      sucursal: this.state.tabIndex
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Añadido correctamente")
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }

  render() {

    if(this.state.ready === true) {
      let Lista0 = this.state.ListaPedidos.map((val,) => {
        if(val.sucursal === 0){
          return (
              [val.numero, val.fecha, val.estado, val.total, val.cliente, val.descripcion]
          )
        }
      }
      );
      let Lista1 = this.state.ListaPedidos.map((val,) => {
        if(val.sucursal === 1){
          return (
              [val.numero, val.fecha, val.estado, val.total, val.cliente, val.descripcion]
          )
        }
      }
      );
      let Lista2 = this.state.ListaPedidos.map((val,) => {
        if(val.sucursal === 2){
          return (
              [val.numero, val.fecha, val.estado, val.total, val.cliente, val.descripcion]
          )
        }
      }
      );
      return (
        <div style={styles.root}>
            <Card>
                <AppBar position="static" color="primary" >
                  <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="simple tabs example" >
                    <Tab label="Lo Castillo" {...a11yProps(0)}/>
                    <Tab label="Apumanque" {...a11yProps(1)}/>
                    <Tab label="Vitacura" {...a11yProps(2)}/>
                  </Tabs>
                </AppBar>
              <CardBody>
                <div style={{ paddingLeft: 40, paddingTop: 20 }}>
                  <Grid item={true} container direction='row' spacing={1} justify='center' alignItems='center'>
                    <Grid  xs={2} sm={2} md={2}><TextField id="numero" label="Numero" placeholder="numero" /></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="fecha" label="Fecha" placeholder="fecha"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="estado" label="Estado" placeholder="estado"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="total" label="Total" placeholder="total"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="descripcion" label="Descripcion" placeholder="descripcion"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="cliente" label="Cliente" placeholder="cliente"/></Grid>
                    <Grid xs={2} sm={2} md={2}><Button className={styles.boton} color="primary">Buscar</Button></Grid>
                  </Grid>
                </div>

                <TabPanel value={this.state.tabIndex} index={0}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["N° de Pedido", "Fecha", "Estado", "Cliente","Descripción"]}
                      tableData={Lista0}
                  />
                  </TabPanel>
                <TabPanel value={this.state.tabIndex} index={1}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["N° de Pedido", "Fecha", "Estado", "Cliente","Descripción"]}
                      tableData={Lista1}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={2}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["N° de Pedido", "Fecha", "Estado", "Cliente","Descripción"]}
                      tableData={Lista2}
                  />
                </TabPanel>
              </CardBody>

              <div style={styles.botonera}>
                <Button style={styles.botonañadir} color="primary" onClick={this.MostrarNuevoMenu}><AddIcon/>Añadir</Button>
              </div>
            </Card>

            {this.state.estado === 1 &&
              <Card >
                <div style={styles.añadirestilo}> //numero, fecha, estado, total, descripcion, cliente, sucursal
                    <Input style={styles.formañadir} id="numero" label="Numero" placeholder="numero" onChange={(event) => this.setState({numero:event.target.value})}/>
                    <Input style={styles.formañadir} id="fecha" label="Fecha" placeholder="fecha" onChange={(event) => this.setState({fecha:event.target.value})}/>
                    <Input style={styles.formañadir} id="estado" label="Estado" placeholder="estado" onChange={(event) => this.setState({estado2:event.target.value})}/>
                    <Input style={styles.formañadir} id="total" label="Total" placeholder="total" onChange={(event) => this.setState({piedra:event.target.value})}/>
                    <Input style={styles.formañadir} id="cliente" label="Cliente" placeholder="cliente" onChange={(event) => this.setState({precio:event.target.value})}/>
                    <Input style={styles.formañadir} id="descripcion" label="Descripcion" placeholder="descripcion" onChange={(event) => this.setState({descripcion:event.target.value})}/>
                    <Button style={styles.boton} onClick={this.AgregarProducto} color="primary"><AddIcon/></Button>
                  </div>
              </Card>
            }
        </div>
      )
    } else if(this.state.ready === false) {
      return(
        <div style={styles.root}>
          <p></p>
        </div>
      )
    }
  }
}
