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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
      dia1 : "15",
      mes1 : "06",
      ano1 : "2020",
      dia2 : "23",
      mes2 : "06",
      ano2 : "2020",

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangedia1 = this.handleChangedia1.bind(this)
    this.handleChangemes1 = this.handleChangemes1.bind(this)
    this.handleChangeano1 = this.handleChangeano1.bind(this)
    this.handleChangedia2 = this.handleChangedia2.bind(this)
    this.handleChangemes2 = this.handleChangemes2.bind(this)
    this.handleChangeano2 = this.handleChangeano2.bind(this)
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
        desde : this.state.ano1+"-"+this.state.mes1+"-"+this.state.dia1,
        hasta : this.state.ano2+"-"+this.state.mes2+"-"+this.state.dia2,
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

  handleChangedia1(event, newValue) {
    this.setState({dia1: newValue});
  }

  handleChangemes1(event, newValue) {
    this.setState({mes1: newValue});
  }

  handleChangeano1(event, newValue) {
    this.setState({ano1: newValue});
  }

  handleChangedia2(event, newValue) {
    this.setState({dia2: newValue});
  }

  handleChangemes2(event, newValue) {
    this.setState({mes2: newValue});
  }

  handleChangeano2(event, newValue) {
    this.setState({ano2: newValue});
  }

  componentDidMount() {
    this.ActualizarVentasPeriodo()
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
              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Día</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.dia1}
                  onChange={this.handleChangedia1}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"4"}>3</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"6"}>6</MenuItem>
                  <MenuItem value={"7"}>7</MenuItem>
                  <MenuItem value={"8"}>8</MenuItem>
                  <MenuItem value={"9"}>9</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"11"}>11</MenuItem>
                  <MenuItem value={"12"}>12</MenuItem>
                  <MenuItem value={"13"}>13</MenuItem>
                  <MenuItem value={"14"}>14</MenuItem>
                  <MenuItem value={"15"}>15</MenuItem>
                  <MenuItem value={"16"}>16</MenuItem>
                  <MenuItem value={"17"}>17</MenuItem>
                  <MenuItem value={"18"}>18</MenuItem>
                  <MenuItem value={"19"}>19</MenuItem>
                  <MenuItem value={"20"}>20</MenuItem>
                  <MenuItem value={"21"}>21</MenuItem>
                  <MenuItem value={"22"}>22</MenuItem>
                  <MenuItem value={"23"}>23</MenuItem>
                  <MenuItem value={"24"}>24</MenuItem>
                  <MenuItem value={"25"}>25</MenuItem>
                  <MenuItem value={"26"}>26</MenuItem>
                  <MenuItem value={"27"}>27</MenuItem>
                  <MenuItem value={"28"}>28</MenuItem>
                  <MenuItem value={"29"}>29</MenuItem>
                  <MenuItem value={"30"}>30</MenuItem>
                  <MenuItem value={"31"}>31</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.mes1}
                  onChange={this.state.handleChangemes1}
                >
                  <MenuItem value={"01"}>Enero</MenuItem>
                  <MenuItem value={"02"}>Febrero</MenuItem>
                  <MenuItem value={"03"}>Marzo</MenuItem>
                  <MenuItem value={"04"}>Abril</MenuItem>
                  <MenuItem value={"05"}>Mayo</MenuItem>
                  <MenuItem value={"06"}>Junio</MenuItem>
                  <MenuItem value={"07"}>Julio</MenuItem>
                  <MenuItem value={"08"}>Agosto</MenuItem>
                  <MenuItem value={"09"}>Septiembre</MenuItem>
                  <MenuItem value={"10"}>Octubre</MenuItem>
                  <MenuItem value={"11"}>Noviembre</MenuItem>
                  <MenuItem value={"12"}>Diciembre</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Año</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.ano1}
                  onChange={this.state.handleChangeano1}
                >
                  <MenuItem value={"2020"}>2020</MenuItem>
                  <MenuItem value={"2021"}>2021</MenuItem>
                  <MenuItem value={"2022"}>2022</MenuItem>
                  <MenuItem value={"2023"}>2023</MenuItem>
                  <MenuItem value={"2024"}>2024</MenuItem>
                  <MenuItem value={"2025"}>2025</MenuItem>
                  <MenuItem value={"2026"}>2026</MenuItem>
                  <MenuItem value={"2027"}>2027</MenuItem>
                  <MenuItem value={"2028"}>2028</MenuItem>
                  <MenuItem value={"2029"}>2029</MenuItem>
                  <MenuItem value={"2030"}>2030</MenuItem>
                  <MenuItem value={"2031"}>2031</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Día</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.dia2}
                  onChange={this.state.handleChangedia2}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={22}>22</MenuItem>
                  <MenuItem value={23}>23</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={26}>26</MenuItem>
                  <MenuItem value={27}>27</MenuItem>
                  <MenuItem value={28}>28</MenuItem>
                  <MenuItem value={29}>29</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={31}>31</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.mes2}
                  onChange={this.state.handleChangemes2}
                >
                  <MenuItem value={"01"}>Enero</MenuItem>
                  <MenuItem value={"02"}>Febrero</MenuItem>
                  <MenuItem value={"03"}>Marzo</MenuItem>
                  <MenuItem value={"04"}>Abril</MenuItem>
                  <MenuItem value={"05"}>Mayo</MenuItem>
                  <MenuItem value={"06"}>Junio</MenuItem>
                  <MenuItem value={"07"}>Julio</MenuItem>
                  <MenuItem value={"08"}>Agosto</MenuItem>
                  <MenuItem value={"09"}>Septiembre</MenuItem>
                  <MenuItem value={"10"}>Octubre</MenuItem>
                  <MenuItem value={"11"}>Noviembre</MenuItem>
                  <MenuItem value={"12"}>Diciembre</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={styles.formControl}>
                <InputLabel id="demo-simple-select-label">Año</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.ano2}
                  onChange={this.state.handleChangeano2}
                >
                  <MenuItem value={"2020"}>2020</MenuItem>
                  <MenuItem value={"2021"}>2021</MenuItem>
                  <MenuItem value={"2022"}>2022</MenuItem>
                  <MenuItem value={"2023"}>2023</MenuItem>
                  <MenuItem value={"2024"}>2024</MenuItem>
                  <MenuItem value={"2025"}>2025</MenuItem>
                  <MenuItem value={"2026"}>2026</MenuItem>
                  <MenuItem value={"2027"}>2027</MenuItem>
                  <MenuItem value={"2028"}>2028</MenuItem>
                  <MenuItem value={"2029"}>2029</MenuItem>
                  <MenuItem value={"2030"}>2030</MenuItem>
                  <MenuItem value={"2031"}>2031</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" onClick={this.ActualizarVentasPeriodo}>Aplicar</Button>

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
                <Button style={{ float: 'right', margin: 5 }} onClick={this.ActualizarVentasPeriodo}>
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
