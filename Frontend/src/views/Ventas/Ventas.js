import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardHeader from "components/Card/CardHeader.js";
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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ventas de día</h4>
          </CardHeader>
          <CardBody>
      <AppBar position="static" color="primary" className={classes.Barrita}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Lo Castillo" {...a11yProps(0)} />
          <Tab label="Apumanque" {...a11yProps(1)} />
          <Tab label="Vitacura" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <GridContainer className={classes.buscador} direction="row" justify>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Numero" id="numero" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Fecha" id="fecha" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Metodo" id="metodo" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Descuento" id="descuento" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Vendedor" id="vendedor" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Cliente" id="cliente" formControlProps={{ fullWidth: true }} /></GridItem>
        <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Total" id="total" formControlProps={{ fullWidth: true }} /></GridItem>

        <GridItem xs={2} sm={2} md={2}><Button className={classes.boton} color="primary">Actualizar</Button></GridItem>
      </GridContainer>

      <TabPanel value={value} index={0}>
        <Table
          tableHeaderColor="primary"
          tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
          tableData={[
            ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
          ]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Table
        tableHeaderColor="primary"
        tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
        tableData={[
          ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
        ]}
      />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Table
        tableHeaderColor="primary"
        tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
        tableData={[
          ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
        ]}
      />
      </TabPanel>
      </CardBody>
      </Card>
    </GridItem>

    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Ventas de la semana</h4>
        </CardHeader>
        <CardBody>
    <AppBar position="static" color="primary" className={classes.Barrita}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Lo Castillo" {...a11yProps(0)} />
        <Tab label="Apumanque" {...a11yProps(1)} />
        <Tab label="Vitacura" {...a11yProps(2)} />
      </Tabs>
    </AppBar>

    <GridContainer className={classes.buscador} direction="row" justify>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Numero" id="numero" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Fecha" id="fecha" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Metodo" id="metodo" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Descuento" id="descuento" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Vendedor" id="vendedor" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Cliente" id="cliente" formControlProps={{ fullWidth: true }} /></GridItem>
      <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Total" id="total" formControlProps={{ fullWidth: true }} /></GridItem>

      <GridItem xs={2} sm={2} md={2}><Button className={classes.boton} color="primary">Actualizar</Button></GridItem>
    </GridContainer>

    <TabPanel value={value} index={0}>
      <Table
        tableHeaderColor="primary"
        tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
        tableData={[
          ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
        ]}
      />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <Table
      tableHeaderColor="primary"
      tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
      tableData={[
        ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
      ]}
    />
    </TabPanel>
    <TabPanel value={value} index={2}>
    <Table
      tableHeaderColor="primary"
      tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
      tableData={[
        ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
      ]}
    />
    </TabPanel>
    </CardBody>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Ventas del mes</h4>
      </CardHeader>
      <CardBody>
  <AppBar position="static" color="primary" className={classes.Barrita}>
    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
      <Tab label="Lo Castillo" {...a11yProps(0)} />
      <Tab label="Apumanque" {...a11yProps(1)} />
      <Tab label="Vitacura" {...a11yProps(2)} />
    </Tabs>
  </AppBar>

  <GridContainer className={classes.buscador} direction="row" justify>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Numero" id="numero" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Fecha" id="fecha" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Metodo" id="metodo" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Descuento" id="descuento" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Vendedor" id="vendedor" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Cliente" id="cliente" formControlProps={{ fullWidth: true }} /></GridItem>
    <GridItem xs={2} sm={2} md={2}><CustomInput labelText="Total" id="total" formControlProps={{ fullWidth: true }} /></GridItem>

    <GridItem xs={2} sm={2} md={2}><Button className={classes.boton} color="primary">Actualizar</Button></GridItem>
  </GridContainer>

  <TabPanel value={value} index={0}>
    <Table
      tableHeaderColor="primary"
      tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
      tableData={[
        ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
      ]}
    />
  </TabPanel>
  <TabPanel value={value} index={1}>
  <Table
    tableHeaderColor="primary"
    tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
    tableData={[
      ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
    ]}
  />
  </TabPanel>
  <TabPanel value={value} index={2}>
  <Table
    tableHeaderColor="primary"
    tableHead={["N° de venta", "Fecha", "Metodo de pago","Descuento", "Id Vendedor","Id Cliente", "Total"]}
    tableData={[
      ["000001", "15/05/2020", "Efectivo", "20%","00002","00003", "$99999"],
    ]}
  />
  </TabPanel>
  </CardBody>
  </Card>
</GridItem>

  </GridContainer>
  );
}
