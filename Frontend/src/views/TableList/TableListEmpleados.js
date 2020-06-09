import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";


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
  buscador: {
    marginHorizontal: "10px"
  },
  boton: {
    marginLeft: "20px"
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(styles);

export default class TableListEmpleados extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, newValue) {
    this.setState({tabIndex: newValue});
  }



  render() {
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
          <CardBody>
            <div style={{ paddingLeft: 40, paddingTop: 20 }}>
              <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                <Grid  xs={2} sm={2} md={2}><TextField id="codigo" label="Codigo" placeholder="codigo" /></Grid>
                <Grid  xs={2} sm={2} md={2}><TextField id="producto" label="Producto" placeholder="producto"/></Grid>
                <Grid  xs={2} sm={2} md={2}><TextField id="material" label="Material" placeholder="material"/></Grid>
                <Grid  xs={2} sm={2} md={2}><TextField id="piedra" label="Piedra" placeholder="piedra"/></Grid>
                <Grid  xs={2} sm={2} md={2}><TextField id="precio" label="Precio" placeholder="precio"/></Grid>
  
                <Grid xs={2} sm={2} md={2}><Button style={styles.boton} color="primary">Buscar</Button></Grid>
              </Grid>
            </div>
  
            <TabPanel value={this.state.tabIndex} index={0}>
              <Table
                tableHeaderColor="primary"
                tableHead={["Nombre", "Rut", "Tienda","Edad", "Rol","Telefono", "Salario"]}
                tableData={[
                  ["Franco Palma", "19783062-k", "Lo Castillo", "22","Jefe supremo","132", "$9999999999"],
                  ["Diego Inostroza", "6969696-9", "La calle", "10","Putita","666", "Trabaja gratis, es putita"],
                ]}
              />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>
              <Table
                tableHeaderColor="primary"
                tableHead={["Nombre", "Rut", "Tienda","Edad", "Rol","Telefono", "Salario"]}
                tableData={[
                  ["Franco Palma", "19783062-k", "Lo Castillo", "22","Jefe supremo","132", "$9999999999"],
                  ["Diego Inostroza", "6969696-9", "La calle", "10","Putita","666", "Trabaja gratis, es putita"],
                ]}
              />
              </TabPanel>
            <TabPanel value={this.state.tabIndex} index={2}>
              <Table
                tableHeaderColor="primary"
                tableHead={["Nombre", "Rut", "Tienda","Edad", "Rol","Telefono", "Salario"]}
                tableData={[
                  ["Franco Palma", "19783062-k", "Lo Castillo", "22","Jefe supremo","132", "$9999999999"],
                  ["Diego Inostroza", "6969696-9", "La calle", "10","Putita","666", "Trabaja gratis, es putita"],
                ]}
              />
            </TabPanel>
          </CardBody>
        </Card>
      </div>
    );
  }
}
