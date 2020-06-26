import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table';
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
      estado: 0,
      perfil: null,
      ListaProductos: null,
      sucursal : null,
      ready: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.MostrarNuevoMenu = this.MostrarNuevoMenu.bind(this)
    this.AgregarProducto = this.AgregarProducto.bind(this)
    this.ActualizarInventario = this.ActualizarInventario.bind(this)
    this.EditarProducto = this.EditarProducto.bind(this)
    this.EliminarProducto = this.EliminarProducto.bind(this)
  }

  getUsuario = () => {
    let info = JSON.parse(localStorage.getItem('usuario'));
    this.setState({
      perfil: info,
      isReady: true,
      tabIndex: info.sucursal
    })
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
      });
  }

  componentDidMount() {
    this.getUsuario();
    this.ActualizarInventario();
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
    console.log(this.state.tabIndex)
  }

  actualizarTexto(event, id, value) {
    this.setState({id: value});
  }

  MostrarNuevoMenu() {
    if(this.state.estado === 0) this.setState({estado: 1})
    if(this.state.estado === 1) this.setState({estado: 0})
  }

  AgregarProducto(newData) {
    fetch('/agregar_prod', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      codigo: newData.codigo,
      material: newData.material,
      tipo: newData.tipo,
      piedra: newData.piedra,
      precio: newData.precio,
      descripcion: newData.descripcion,
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

  EditarProducto(newData) {
    console.log(newData._id)
    fetch('/editar_prod/' + newData._id, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: newData._id,
      codigo: newData.codigo,
      material: newData.material,
      tipo: newData.tipo,
      piedra: newData.piedra,
      precio: newData.precio,
      descripcion: newData.descripcion,
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

  EliminarProducto(oldData) {
    console.log(oldData._id)
    fetch('/delete_producto/' + oldData._id, {
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

  render() {

    if(this.state.ready === true) {
      if(this.state.perfil.rol === 'duena'){
        return (
          <div style={styles.root}>
              <Card>
                  <AppBar position="static" color="primary" >
                    <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="Sucursales" >
                      <Tab label="Lo Castillo" {...a11yProps(0)}/>
                      <Tab label="Apumanque" {...a11yProps(1)}/>
                      <Tab label="Vitacura" {...a11yProps(2)}/>
                    </Tabs>
                  </AppBar>
                <CardBody>

                <TabPanel value={this.state.tabIndex} index={0}>
                <MaterialTable
                    title='Lo Castillo'
                    columns={ [{ title: 'Codigo', field: 'codigo' },
                              { title: 'Material', field: 'material' },
                              { title: 'Tipo', field: 'tipo'},
                              { title: 'Piedra', field: 'piedra' },
                              { title: 'Precio', field: 'precio' ,type: 'numeric'},
                              { title: 'Descripcion', field: 'descripcion' }]}
                    data={this.state.ListaProductos.filter(({sucursal}) => sucursal === '0')}
                    editable={{
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.AgregarProducto(newData);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EditarProducto(newData)
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EliminarProducto(oldData)
                        }),
                    }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                <MaterialTable
                    title='Apumanque'
                    columns={ [{ title: 'Codigo', field: 'codigo' },
                              { title: 'Material', field: 'material' },
                              { title: 'Tipo', field: 'tipo'},
                              { title: 'Piedra', field: 'piedra' },
                              { title: 'Precio', field: 'precio' ,type: 'numeric'},
                              { title: 'Descripcion', field: 'descripcion' }]}
                    data={this.state.ListaProductos.filter(({sucursal}) => sucursal === '1')}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000);
                          this.AgregarProducto(newData);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EditarProducto(newData)
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EliminarProducto(oldData)
                        }),
                    }}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={2}>
                <MaterialTable
                    title={this.state.sucursal}
                    columns={ [{ title: 'Codigo', field: 'codigo' },
                              { title: 'Material', field: 'material' },
                              { title: 'Tipo', field: 'tipo'},
                              { title: 'Piedra', field: 'piedra' },
                              { title: 'Precio', field: 'precio' ,type: 'numeric'},
                              { title: 'Descripcion', field: 'descripcion' }]}
                    data={this.state.ListaProductos.filter(({sucursal}) => sucursal === '2')}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000);
                          this.AgregarProducto(newData);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EditarProducto(newData)
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EliminarProducto(oldData)
                        })
                    }}
                  />
                </TabPanel>

                </CardBody>
              </Card>
          </div>
        )
      } else if(this.state.perfil.rol === 'vendedor'){
        return (
          <div style={styles.root}>
              <Card>
                <CardBody>
                <MaterialTable
                    title='Tu sucursal'
                    columns={ [{ title: 'Codigo', field: 'codigo' },
                              { title: 'Material', field: 'material' },
                              { title: 'Tipo', field: 'tipo'},
                              { title: 'Piedra', field: 'piedra' },
                              { title: 'Precio', field: 'precio' ,type: 'numeric'},
                              { title: 'Descripcion', field: 'descripcion' }]}
                    data={this.state.ListaProductos.filter(({sucursal}) => sucursal === this.state.perfil.sucursal)}
                    editable={{ }}
                  />
                </CardBody>
              </Card>
          </div>
        )
      } else if(this.state.perfil.rol === 'jefe'){
        return (
          <div style={styles.root}>
              <Card>
                <CardBody>
                <MaterialTable
                    title='Tu sucursal'
                    columns={ [{ title: 'Codigo', field: 'codigo' },
                              { title: 'Material', field: 'material' },
                              { title: 'Tipo', field: 'tipo'},
                              { title: 'Piedra', field: 'piedra' },
                              { title: 'Precio', field: 'precio' ,type: 'numeric'},
                              { title: 'Descripcion', field: 'descripcion' }]}
                    data={this.state.ListaProductos.filter(({sucursal}) => sucursal === this.state.perfil.sucursal)}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000);
                          this.AgregarProducto(newData);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EditarProducto(newData)
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarInventario();
                          }, 2000)
                          this.EliminarProducto(oldData)
                        })
                    }}
                  />
                </CardBody>
              </Card>
          </div>
        )
      }
    } else if(this.state.ready === false) {
      return(
        <div style={styles.root}>
          <p></p>
        </div>
      )
    }
  }
}
