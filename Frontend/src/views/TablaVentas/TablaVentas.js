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

export default class Ventas extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      ready: false,
      ready2: false,
      ListaVentasDia: null,
      ListaVentasPeriodo: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.ActualizarVentasDia = this.ActualizarVentasDia.bind(this)

  }

  ActualizarVentasDia() {
    fetch('/ventasdia')
      .then(res => {
          return res.json()
          console.log(res.json())
          console.log("Hola")
      })
      .then(users => {
          this.setState({ListaVentasDia: users, ready: true})
          console.log(this.state.ListaVentasDia);
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

  componentDidMount() {
    this.ActualizarVentasDia()
  }

  render() {
    if(this.state.ready === true) {
      console.log(this.state.ListaVentasDia)
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
              <h4 style={styles.cardTitleWhite}>Ventas de día</h4>
            </CardHeader>
              <CardBody>
              <TabPanel value={this.state.tabIndex} index={0}>
                <MaterialTable
                    title='Lo Castillo'
                    columns={ [{ title: 'Numero', field: 'numero_venta', type: 'numeric' },
                              { title: 'Descuento', field: 'descuento',type: 'numeric' },
                              { title: 'Fecha', field: 'fecha', type: 'date'},
                              { title: 'Pago', field: 'metodo_pago' },
                              { title: 'Total', field: 'total' ,type: 'numeric'},
                              { title: 'Vendedor', field: 'vendedor'} ]}
                    data={this.state.ListaVentasDia.filter(({sucursal}) => sucursal === 0)}
                    editable={{
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarVentasDia();
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
                    data={this.state.ListaVentasDia.filter(({sucursal}) => sucursal === 1)}
                    editable={{
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            this.ActualizarVentasDia();
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
                    data={this.state.ListaVentasDia.filter(({sucursal}) => sucursal === 2)}
                    editable={{
                      onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          this.ActualizarVentasDia();
                        }, 2000)
                        this.EliminarVenta(oldData)
                      }),
                    }}
                  />
                </TabPanel>
              </CardBody>
          </Card>

          <Card>
            <CardHeader color="primary">
              <h4 style={styles.cardTitleWhite}>Ventas por periodo</h4>
            </CardHeader>
            <CardBody>



            </CardBody>
          </Card>
        </div>
      );
    } else if(this.state.ready === false) {
      return(
        <div style={styles.root}>
          <p></p>
        </div>
      )
    }
  }
}
