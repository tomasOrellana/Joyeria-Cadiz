import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { container } from "assets/jss/material-dashboard-react";
import { Container } from "@material-ui/core";
import { card } from "assets/jss/material-dashboard-react";


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
  }
};


const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <GridContainer>
      <Container className={classes.picker}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Sucursal</InputLabel>
          <Select
            native
            value={state.age}
            onChange={handleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={1}>LO CASTILLO</option>
            <option value={2}>APUMANQUE</option>
            <option value={3}>VITACURA</option>
          </Select>
        </FormControl>
      </Container>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>ads</h4>

          </CardHeader>
          <CardBody>

            <Card color="secondary">
              a
            </Card>

            <Table
              tableHeaderColor="primary"
              tableHead={["Código", "Producto", "Material", "Piedra Preciosa", "Foto", "Cantidad","Precio"]}
              tableData={[
                ["1565228", "Anillo de compromiso", "Adamantium", "Diamante","A_C_Adam.png","300","$36.738"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
