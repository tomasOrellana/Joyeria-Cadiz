import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TextField from '@material-ui/core/TextField';
import {Button} from 'antd';
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

export default class TablaVentasPeriodo extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      ready: false,
      ListaVentasPeriodo: null,
      desde : "2020-06-15",
      hasta : "2020-06-24"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangefecha1 = this.handleChangefecha1.bind(this)
    this.handleChangefecha2 = this.handleChangefecha2.bind(this)
    this.ActualizarVentasPeriodo = this.ActualizarVentasPeriodo.bind(this)

  }

    ActualizarVentasPeriodo() {
      fetch('/ventasperiodo', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        desde : this.state.desde,
        hasta : this.state.hasta
      })
      })
      .then(res => {
          return res.json()
      })
      .then(users => {
          this.setState({ListaVentasPeriodo: users, ready: true})
          console.log(this.state.ListaVentasPeriodo);
      });
    }

  EliminarVenta(oldData) {
    console.log(oldData._id)
    fetch('/eliminar_venta/' + oldData._id, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: oldData._id,
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Eliminado correctamente")
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
  }

  handleChangefecha1(event, newValue) {
    this.setState({desde: newValue});
  }

  handleChangefecha2(event, newValue) {
    this.setState({hasta: newValue});
  }


  render() {
    if(this.state.ready === true) {
      console.log(this.state.ListaVentasPeriodo)
      return (
        <div style={styles.root}>
          <Card>
            <AppBar position="static" color="primary" style={styles.Barrita}>
              <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="simple tabs example">
                <Tab label="Lo Castillo" {...a11yProps(0)} />
                <Tab label="Apumanque" {...a11yProps(1)} />
                <Tab label="Vitacura" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <CardHeader color="primary" style={{marginTop:20}}>
              <h4 style={styles.cardTitleWhite}>Ventas por Periodo</h4>
            </CardHeader>
              <CardBody>
                <form style={styles.container} noValidate>
                  <TextField
                    id="desde"
                    label="Desde"
                    type="date"
                    defaultValue="2020-06-15"
                    value={this.state.desde}
                    style={styles.textField}
                    onChange={this.handleChangefecha1}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    id="hasta"
                    label="hasta"
                    type="date"
                    defaultValue="2020-06-24"
                    value={this.state.hasta}
                    style={styles.textField}
                    onChange={this.handleChangefecha2}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <Button style={{margin: 5 }} onClick={this.ActualizarVentasPeriodo}>
                  Listo
                </Button>
              <TabPanel value={this.state.tabIndex} index={0}>
                <MaterialTable
                    title='Lo Castillo'
                    columns={ [{ title: 'Numero', field: 'numero_venta', type: 'numeric' },
                              { title: 'Descuento', field: 'descuento',type: 'numeric' },
                              { title: 'Fecha', field: 'fecha', type: 'date'},
                              { title: 'Pago', field: 'metodo_pago' },
                              { title: 'Total', field: 'total' ,type: 'numeric'},
                              { title: 'Vendedor', field: 'vendedor'} ]}
                    data={this.state.ListaVentasPeriodo.filter(({sucursal}) => sucursal === 0)}
                    editable={{
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarVentasPeriodo();
                            }, 2000)
                            this.EliminarVenta(oldData)
                          }),
                    }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                <MaterialTable
                    title='Apumanque'
                    columns={ [{ title: 'Numero', field: 'numero_venta', type: 'numeric' },
                              { title: 'Descuento', field: 'descuento',type: 'numeric' },
                              { title: 'Fecha', field: 'fecha', type: 'date'},
                              { title: 'Pago', field: 'metodo_pago' ,type: 'numeric'},
                              { title: 'Total', field: 'total' ,type: 'numeric'},
                              { title: 'Vendedor', field: 'vendedor'} ]}
                    data={this.state.ListaVentasPeriodo.filter(({sucursal}) => sucursal === 1)}
                    editable={{
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarVentasPeriodo();
                          }, 2000)
                          this.EliminarVenta(oldData)
                        }),
                      }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={2}>
                <MaterialTable
                    title='Vitacura'
                    columns={ [{ title: 'Numero', field: 'numero_venta', type: 'numeric' },
                              { title: 'Descuento', field: 'descuento',type: 'numeric' },
                              { title: 'Fecha', field: 'fecha', type: 'date'},
                              { title: 'Pago', field: 'metodo_pago' ,type: 'numeric'},
                              { title: 'Total', field: 'total' ,type: 'numeric'},
                              { title: 'Vendedor', field: 'vendedor'} ]}
                    data={this.state.ListaVentasPeriodo.filter(({sucursal}) => sucursal === 2)}
                    editable={{
                      onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          this.ActualizarVentasPeriodo();
                        }, 2000)
                        this.EliminarVenta(oldData)
                      }),
                    }}
                  />
                </TabPanel>
              </CardBody>
          </Card>
        </div>
      );
    } else if(this.state.ready === false) {
      return (
        <div style={styles.root}>
          <Card>
            <AppBar position="static" color="primary" style={styles.Barrita}>
              <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="simple tabs example">
                <Tab label="Lo Castillo" {...a11yProps(0)} />
                <Tab label="Apumanque" {...a11yProps(1)} />
                <Tab label="Vitacura" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <CardHeader color="primary" style={{marginTop:20}}>
              <h4 style={styles.cardTitleWhite}>Ventas por Periodo</h4>
            </CardHeader>
              <CardBody>
                <form style={styles.container} noValidate>
                  <TextField
                    id="desde"
                    label="Desde"
                    type="date"
                    defaultValue=""
                    value={this.state.desde}
                    style={styles.textField}
                    onChange={this.handleChangefecha1}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    id="Hasta"
                    label="Hasta"
                    type="date"
                    defaultValue=""
                    value={this.state.Hasta}
                    style={styles.textField}
                    onChange={this.handleChangefecha2}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <Button style={{ float: 'right', margin: 5 }} onClick={this.ActualizarVentasPeriodo()}>
                  Listo
                </Button>
              <TabPanel value={this.state.tabIndex} index={0}>
              </TabPanel>
              <TabPanel value={this.state.tabIndex} index={1}>
              </TabPanel>
              <TabPanel value={this.state.tabIndex} index={2}>
              </TabPanel>
            </CardBody>
          </Card>
        </div>
      )
    }
  }
}
