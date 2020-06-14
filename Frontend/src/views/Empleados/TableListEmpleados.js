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
      ListaEmpleados: null,
      ready: false,
      nombre : null,
      rut : null,
      sucursal : null,
      edad: null,
      rol: null,
      telefono: null,
      salario: null,

    }
    this.handleChange = this.handleChange.bind(this)
    this.MostrarNuevoMenu = this.MostrarNuevoMenu.bind(this)
    this.AgregarEmpleado = this.AgregarEmpleado.bind(this)
  }
//
  componentDidMount() {
    fetch('/empleados')
      .then(res => {
          console.log(res);
          return res.json()
      })
      .then(users => {
          this.setState({ListaEmpleados: users, ready: true})
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

  AgregarEmpleado() {
    console.log(this.state.tabIndex)
    fetch('/agregar_empleado', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre : this.state.nombre,
      rut : this.state.rut,
      sucursal : this.state.sucursal,
      edad: this.state.edad,
      rol: this.state.rol,
      telefono: this.state.telefono,
      salario: this.state.salio,
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
      let Lista0 = this.state.ListaEmpleados.map((val,) => {
        if(val.sucursal === "Lo Castillo"){
          return (
              [val.nombre, val.rut, val.sucursal, val.edad, val.rol, val.telefono, val.salario]
          )
        }
      }
      );
      let Lista1 = this.state.ListaEmpleados.map((val,) => {
        if(val.sucursal === "Apumanque"){
          return (
              [val.nombre, val.rut, val.sucursal, val.edad, val.rol, val.telefono, val.salario]
          )
        }
      }
      );
      let Lista2 = this.state.ListaEmpleados.map((val,) => {
        if(val.sucursal === "Vitacura"){
          return (
              [val.nombre, val.rut, val.sucursal, val.edad, val.rol, val.telefono, val.salario]
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
                    <Grid  xs={2} sm={2} md={2}><TextField id="nombre" label="Nombre" placeholder="nombre" /></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="rut" label="Rut" placeholder="rut"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="edad" label="Edad" placeholder="edad"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="rol" label="Rol" placeholder="rol"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="telefono" label="Telefono" placeholder="telefono"/></Grid>
                    <Grid  xs={2} sm={2} md={2}><TextField id="salario" label="Salario" placeholder="salario"/></Grid>
                    <Grid xs={2} sm={2} md={2}><Button className={styles.boton} color="primary">Buscar</Button></Grid>
                  </Grid>
                </div>

                <TabPanel value={this.state.tabIndex} index={0}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Nombre", "Rut", "Sucursal","Edad", "Rol","Telefono", "Salario"]}
                      tableData={Lista0}
                  />
                  </TabPanel>
                <TabPanel value={this.state.tabIndex} index={1}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Nombre", "Rut", "Sucursal","Edad", "Rol","Telefono", "Salario"]}
                      tableData={Lista1}
                  />
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={2}>
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Nombre", "Rut", "Sucursal","Edad", "Rol","Telefono", "Salario"]}
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
                <div style={styles.añadirestilo}>
                    <Input style={styles.formañadir} id="nombre" label="Nombre" placeholder="nombre" onChange={(event) => this.setState({nombre:event.target.value})}/>
                    <Input style={styles.formañadir} id="rut" label="Rut" placeholder="rut" onChange={(event) => this.setState({rut:event.target.value})}/>
                    <Input style={styles.formañadir} id="edad" label="Edad" placeholder="edad" onChange={(event) => this.setState({edad:event.target.value})}/>
                    <Input style={styles.formañadir} id="rol" label="Rol" placeholder="rol" onChange={(event) => this.setState({rol:event.target.value})}/>
                    <Input style={styles.formañadir} id="telefono" label="Telefono" placeholder="telefono" onChange={(event) => this.setState({telefono:event.target.value})}/>
                    <Input style={styles.formañadir} id="salario" label="Salario" placeholder="salario" onChange={(event) => this.setState({salario:event.target.value})}/>
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
