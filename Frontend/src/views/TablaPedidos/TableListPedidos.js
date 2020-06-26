import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

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
      ready: false,
      ListaPedidos: null,
      mensaje: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.AgregarPedido = this.AgregarPedido.bind(this)
    this.ActualizarPedidos = this.ActualizarPedidos.bind(this)
  }

  ActualizarPedidos() {
    fetch('/pedidos')
      .then(res => {
          return res.json()
      })
      .then(users => {
          this.setState({ListaPedidos: users, ready: true})
          console.log(this.state.ListaPedidos);
      });
    }

  AgregarPedido(newData) {
    let estados = null;
    if(newData.estado === true) {
      estados = 1;
    } else {
      estados = 0;
    }

    fetch('/agregar_pedido', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fecha: newData.fecha,
      cliente: newData.cliente,
      descripcion: newData.descripcion,
      estado: estados,
      total: newData.total,
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

  EditarPedido(newData) {
    console.log(newData._id)
    fetch('/editar_pedido/' + newData._id, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: newData._id,
      fecha: newData.fecha,
      cliente: newData.cliente,
      descripcion: newData.descripcion,
      estado: newData.estado,
      total: newData.total,
      sucursal: this.state.tabIndex
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Editado correctamente")
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }

  EliminarPedido(oldData) {
    console.log(oldData._id)
    fetch('/eliminar_pedido/' + oldData._id, {
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

  getUsuario = () => {
    this.setState({
      perfil: JSON.parse(localStorage.getItem('usuario')),
      isReady: true
    }) 
  }

  componentDidMount() {
    this.ActualizarPedidos()
    this.getUsuario()
    console.log(this.state.ListaPedidos)
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
  }

  actualizarTexto(event, id, value) {
    this.setState({id: value});
  }

  render() {
    let mensajito;
    if(this.state.mensaje === 1) {
      mensajito = <Alert severity="success">Pedido agregado correctamente</Alert>
    } else if(this.state.mensaje === 2) {
      mensajito = <Alert severity="error">Lo siento, no tienes permiso para esa accion.</Alert>
    }

    if(this.state.ready === true) {
      return (
        <div style={styles.root}>
            {mensajito}
            <Card>
              <AppBar position="static" color="primary" >
                <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="simple tabs example" >
                  <Tab label="Lo Castillo" {...a11yProps(0)}/>
                  <Tab label="Apumanque" {...a11yProps(1)}/>
                  <Tab label="Vitacura" {...a11yProps(2)}/>
                </Tabs>
              </AppBar>

              <CardBody>
                <TabPanel value={this.state.tabIndex} index={0}>
                <MaterialTable
                    title='Lo Castillo'
                    columns={ [{ title: 'Fecha', field: 'fecha', type: 'date' },
                              { title: 'Cliente', field: 'cliente' },
                              { title: 'Descripcion', field: 'descripcion'},
                              { title: 'Estado', field: 'estado', lookup: { 0: 'EN PROCESO', 1: 'LISTO PARA RETIRO' ,2: 'ENTREGADO'}},
                              { title: 'Total', field: 'total' ,type: 'numeric'}]}
                    data={this.state.ListaPedidos.filter(({sucursal}) => sucursal === '0')}
                    editable={{
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          if(this.state.perfil.rol === 'duena' || this.state.perfil.rol === 'jefe') {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarPedidos();
                            }, 2000)
                            this.AgregarPedido(newData);
                          } else {
                            this.setState({mensaje:2})
                            resolve();
                          }
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          if(this.state.perfil.rol === 'vendedor') {
                            if(oldData.cliente !== newData.cliente || oldData.fecha !== newData.fecha || oldData.total !== newData.total) {
                              setTimeout(() => {
                                resolve();
                                this.ActualizarPedidos();
                              }, 2000)
                              console.log(oldData)
                              console.log(newData)
                              this.EditarPedido(newData)
                            } else {
                              this.setState({mensaje:2})
                              resolve();
                            }
                          } else {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarPedidos();
                            }, 2000)
                            console.log(oldData)
                            console.log(newData)
                            this.EditarPedido(newData)
                          }
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarPedidos();
                          }, 2000)
                          this.EliminarPedido(oldData)
                        }),
                    }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                <MaterialTable
                    title='Apumanque'
                    columns={ [{ title: 'Fecha', field: 'fecha', type: 'date' },
                              { title: 'Cliente', field: 'cliente' },
                              { title: 'Descripcion', field: 'descripcion'},
                              { title: 'Estado', field: 'estado', lookup: { 0: 'EN PROCESO', 1: 'LISTO PARA RETIRO' ,2: 'ENTREGADO'}},
                              { title: 'Total', field: 'total' ,type: 'numeric'}]}
                    data={this.state.ListaPedidos.filter(({sucursal}) => sucursal === '1')}
                    editable={{
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          if(this.state.perfil.rol === 'duena' || this.state.perfil.rol === 'jefe') {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarPedidos();
                            }, 2000)
                            this.AgregarPedido(newData);
                          } else {
                            this.setState({mensaje:2})
                            resolve();
                          }
                        }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            if(this.state.perfil.rol === 'vendedor') {
                              if(oldData.cliente !== newData.cliente || oldData.fecha !== newData.fecha || oldData.total !== newData.total) {
                                setTimeout(() => {
                                  resolve();
                                  this.ActualizarPedidos();
                                }, 2000)
                                console.log(oldData)
                                console.log(newData)
                                this.EditarPedido(newData)
                              } else {
                                this.setState({mensaje:2})
                                resolve();
                              }
                            } else {
                              setTimeout(() => {
                                resolve();
                                this.ActualizarPedidos();
                              }, 2000)
                              console.log(oldData)
                              console.log(newData)
                              this.EditarPedido(newData)
                            }
                          }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarPedidos();
                          }, 2000)
                          this.EliminarPedido(oldData)
                        }),
                    }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={2}>
                <MaterialTable
                    title='Vitacura'
                    columns={ [{ title: 'Fecha', field: 'fecha', type: 'date' },
                              { title: 'Cliente', field: 'cliente' },
                              { title: 'Descripcion', field: 'descripcion'},
                              { title: 'Estado', field: 'estado', lookup: { 0: 'EN PROCESO', 1: 'LISTO PARA RETIRO' ,2: 'ENTREGADO'}},
                              { title: 'Total', field: 'total' ,type: 'numeric'}]}
                    data={this.state.ListaPedidos.filter(({sucursal}) => sucursal === '2')}
                    editable={{
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          if(this.state.perfil.rol === 'duena' || this.state.perfil.rol === 'jefe') {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarPedidos();
                            }, 2000)
                            this.AgregarPedido(newData);
                          } else {
                            this.setState({mensaje:2})
                            resolve();
                          }
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          if(this.state.perfil.rol === 'vendedor') {
                            if(oldData.cliente !== newData.cliente || oldData.fecha !== newData.fecha || oldData.total !== newData.total) {
                              setTimeout(() => {
                                resolve();
                                this.ActualizarPedidos();
                              }, 2000)
                              console.log(oldData)
                              console.log(newData)
                              this.EditarPedido(newData)
                            } else {
                              this.setState({mensaje:2})
                              resolve();
                            }
                          } else {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarPedidos();
                            }, 2000)
                            console.log(oldData)
                            console.log(newData)
                            this.EditarPedido(newData)
                          }
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarPedidos();
                          }, 2000)
                          this.EliminarPedido(oldData)
                        }),
                    }}
                  />
                </TabPanel>
              </CardBody>
            </Card>
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
