import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const styles = {
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


export default class Inicio extends React.Component {
  render() {
    return (
      <div>
        <GridContainer>
  
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>done</Icon>
                </CardIcon>
                <p style={styles.cardCategory}>Entregas</p>
                <h3 style={styles.cardTitle}>
                  3 <small>listas</small>
                </h3>
              </CardHeader>
              
              <CardFooter stats>
                <div style={styles.stats}>
                  <Update />
                  Mas info en seccion taller
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>palette</Icon>
                </CardIcon>
                <p style={styles.cardCategory}>Taller</p>
                <h3 style={styles.cardTitle}>
                  4 <small>pedidos</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={styles.stats}>
                  <Update />
                  Mas info en seccion Taller
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>shopping_basket</Icon>
                </CardIcon>
                <p style={styles.cardCategory}>Ventas diarias</p>
                <h3 style={styles.cardTitle}>32</h3>
              </CardHeader>
              <CardFooter stats>
                <div style={styles.stats}>
                  <LocalOffer />
                  Mas info en seccion ventas
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>person_pin</Icon>
                </CardIcon>
                <p style={styles.cardCategory}>Empleados</p>
                <h3 style={styles.cardTitle}>
                  103 <small>totales</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={styles.stats}>
                  <LocalOffer />
                  Mas info en seccion empleados
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
  
        </GridContainer>
  
  
        <GridContainer>
  
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 style={styles.cardTitle}>Ventas semanales</h4>
                <p style={styles.cardCategory}>
                  <span style={styles.successText}>
                    <ArrowUpward style={styles.upArrowCardCategory} /> 55%
                  </span>{" "}
                  Incremento de hoy.
                </p>
              </CardBody>
              <CardFooter chart>
                <div style={styles.stats}>
                  <AccessTime /> Actualizado hace 17 minutos
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 style={styles.cardTitle}>Ventas mensuales</h4>
                <p style={styles.cardCategory}>asd</p>
              </CardBody>
              <CardFooter chart>
                <div style={styles.stats}>
                  <AccessTime /> Actualizado hace 2 dias
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 style={styles.cardTitle}>Ventas diarias</h4>
                <p style={styles.cardCategory}>asd</p>
              </CardBody>
              <CardFooter chart>
                <div style={styles.stats}>
                  <AccessTime />Actualizado hace 5 minutos
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
        </GridContainer>
      </div>
    );
  }
}
