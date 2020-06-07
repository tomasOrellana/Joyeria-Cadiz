import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import { isConstructorDeclaration } from 'typescript';
import { render } from 'react-dom';

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

  static propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      estado: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.MostrarNuevoMenu = this.MostrarNuevoMenu.bind(this)
  }

  componentDidMount() {
    console.log('aasd')
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
  }

  MostrarNuevoMenu() {
    if(this.state.estado == 0) this.setState({estado: 1})
    if(this.state.estado == 1) this.setState({estado: 0})   
  }

  render() {
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
                <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                  <Grid  xs={2} sm={2} md={2}><TextField id="codigo" label="Codigo" placeholder="codigo" /></Grid>
                  <Grid  xs={2} sm={2} md={2}><TextField id="producto" label="Producto" placeholder="producto"/></Grid>
                  <Grid  xs={2} sm={2} md={2}><TextField id="material" label="Material" placeholder="material"/></Grid>
                  <Grid  xs={2} sm={2} md={2}><TextField id="piedra" label="Piedra" placeholder="piedra"/></Grid>
                  <Grid  xs={2} sm={2} md={2}><TextField id="precio" label="Precio" placeholder="precio"/></Grid>

                  <Grid xs={2} sm={2} md={2}><Button className={styles.boton} color="primary">Buscar</Button></Grid>
                </Grid>
              </div>
              {this.state.tabIndex == 0 &&
              <TabPanel>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Código", "Producto", "Material", "Piedra Preciosa", "Foto", "Cantidad","Precio"]}
                    tableData={[
                      ["1565228", "Anillo de compromiso", "Adamantium", "Diamante","A_C_Adam.png","300","$36.738"]
                    ]}
                />
                </TabPanel> }  
              {this.state.tabIndex == 1 &&
              <TabPanel>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Código", "Producto", "Material", "Piedra Preciosa", "Foto", "Cantidad","Precio"]}
                    tableData={[
                      ["1565228", "Anillo de compromiso", "Adamantium", "asdas","A_C_Adam.png","300","$36.738"]
                    ]}
                />
              </TabPanel> }
              {this.state.tabIndex == 2 &&
              <TabPanel>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Código", "Producto", "Material", "Piedra Preciosa", "Foto", "Cantidad","Precio"]}
                  tableData={[
                    ["1565228", "Anillo de compromiso", "Adamantium", "Diamssssante","A_C_Adam.png","300","$36.738"]
                  ]}
                />
              </TabPanel> }
            </CardBody>
            <div style={styles.botonera}>
              <Button style={styles.botonañadir} color="primary" onClick={this.MostrarNuevoMenu}><AddIcon/>Añadir</Button>
            </div>
          </Card>

          {this.state.estado == 1 &&
            <Card >
              <div style={styles.añadirestilo}>
                  <TextField style={styles.formañadir} id="producto" label="Producto" placeholder="nombre"/>
                  <TextField style={styles.formañadir} id="material" label="Material" placeholder="material"/>
                  <TextField style={styles.formañadir} id="piedra" label="Piedra" placeholder="piedra"/>
                  <TextField style={styles.formañadir} id="precio" label="Precio" placeholder="precio"/>

                  <Button className={styles.boton} color="primary"><AddIcon/></Button>
                </div>
            </Card>
          }
      </div>
    )
  }
}
