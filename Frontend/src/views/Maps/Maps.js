/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
            <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{" "}
              <a
                href="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6661.681712593749!2d-70.5933666!3d-33.4013159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf36c2bbc915%3A0x91ccfad3b405c76a!2sCentro%20Comercial%20Lo%20Castillo!5e0!3m2!1ses!2scl!4v1589416978616!5m2!1ses!2scl"
                target="_blank"
              >
                Google
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <Hidden only={["sm", "xs"]}>
              <iframe
                className={classes.iframe}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6661.681712593749!2d-70.5933666!3d-33.4013159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf36c2bbc915%3A0x91ccfad3b405c76a!2sCentro%20Comercial%20Lo%20Castillo!5e0!3m2!1ses!2scl!4v1589416978616!5m2!1ses!2scl"
                title="Icons iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={["lg", "md"]}>
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/?ref=creativetime"
                    target="_blank"
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
/*<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6661.681712593749!2d-70.5933666!3d-33.4013159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf36c2bbc915%3A0x91ccfad3b405c76a!2sCentro%20Comercial%20Lo%20Castillo!5e0!3m2!1ses!2scl!4v1589416978616!5m2!1ses!2scl"
width="600"
height="450"
frameborder="0"
style="border:0;"
allowfullscreen=""
aria-hidden="false"
 tabindex="0">
</iframe>*/
