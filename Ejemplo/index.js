const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// "sv": "http://192.168.0.92:3000" mi ip
// "sv": "http://104.237.140.131:3000" servidor
// scp: scp -P 22122 app-debug.apk poseidon@104.237.140.131:./poseidon_svr 
// ssh -p 22122 poseidon@104.237.140.131

const { Client } = require('pg')
const connectionString = 'postgresql://poseidon:neptuno@45.79.37.223:54321/poseidon';


const client = new Client({connectionString: connectionString})
client.connect()
//client.query('SELECT ID, NAME FROM TEST', (err, res) => {
//client.query('INSERT INTO TEST VALUES (5,\'cinco\')', (err, res) => {
//client.query('UPDATE TEST SET NAME = \'cinco\' WHERE ID = 5', (err, res) => {
//console.log(err, res)

  

function logger(req,red, next) {
    console.log(`Route recibida: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//setings
app.set('appName', 'Poseidon server');
app.set('port', 3000);
app.set('view engine', 'ejs')

//middlewares
//app.use(express.json());
app.use(logger);
app.use(express.static('public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 




app.post('/workerlist',(req,res) => {
    client.query('SELECT TECDATA.TEC_ID, TECDATA.USR_ID, TECDATA.TEC_CAT, TECDATA.TEC_HOUR, TECDATA.TEC_COST, TECDATA.TEC_QUALY, TECDATA.TEC_QUANT, TECDATA.CUR_COD, USERS.USR_NAME, USERS.USR_EMAIL, USERS.USR_PHONE, USERS.USR_ADDRESS FROM TECDATA, USERS WHERE TECDATA.TEC_STAT=1 AND TECDATA.USR_ID=USERS.USR_ID AND USERS.USR_TYPE=1', (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/providerslist',(req,res) => {
    client.query('SELECT PRODATA.PRO_ID, PRODATA.OPEN, USERS.USR_ID, USERS.USR_NAME, USERS.USR_EMAIL, USERS.USR_ADDRESS, USERS.USR_PHONE, USERS.DATE_IN FROM PRODATA, USERS WHERE PRODATA.USR_ID = USERS.USR_ID', (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/deleteworker',(req,res) => {
    var usr_id = req.body.usr_id;
    var tec_id = req.body.tec_id;
    const query = {
        text: 'SELECT PRO_ID FROM PRODATA WHERE USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,pro_id) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const query2 = { 
                text: 'DELETE FROM PROTEC WHERE PRO_ID=$1 AND TEC_ID=$2',
                values: [pro_id.rows[0][0], tec_id],
                rowMode: 'array',
            }
            client.query(query2, (err,ras) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201)
                    console.log(ras)
                }
            })
        }
    })
})

app.post('/addworker',(req,res) => {
    var usr_id = req.body.usr_id;
    var tec_id = req.body.tec_id;
    var hour = req.body.hour;
    var date = new Date();
    const query = {
        text: 'SELECT PRO_ID FROM PRODATA WHERE USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,pro_id) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log('pro_id ' + pro_id.rows[0][0] + ' tec_id ' + tec_id + ' date '+ date + ' hour' + hour)
            const query2 = {
                text: 'INSERT INTO PROTEC (PRO_ID, TEC_ID, DATE_IN, STAT, HOUR) VALUES ($1, $2, $3, 1, $4)',
                values: [pro_id.rows[0][0], tec_id, date, hour],
                rowMode: 'array',
            }
            client.query(query2, (err,ras) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201)
                    console.log(ras)
                }
            })
        }
    })
})

app.post('/providerslistworker',(req,res) => {
    var usr_id = req.body.usr_id;
    const query = {
        text: 'SELECT TECDATA.TEC_ID FROM TECDATA, USERS WHERE USERS.USR_ID = $1 AND USERS.USR_ID = TECDATA.USR_ID',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,response) => {
        if (err) {
            console.log(err.stack)
            res.send(400)
        } else {
            console.log(response.rows[0][0])
            const query = {
                text: 'SELECT PRODATA.PRO_ID, USERS.USR_NAME, USERS.USR_EMAIL, USERS.USR_PHONE, PROTEC.HOUR, TECDATA.TEC_COST FROM PRODATA,USERS,PROTEC,TECDATA WHERE PROTEC.TEC_ID=$1 AND PROTEC.PRO_ID=PRODATA.PRO_ID AND USERS.USR_ID=PRODATA.USR_ID AND PROTEC.TEC_ID = TECDATA.TEC_ID',
                values: [response.rows[0][0]],
                rowMode: 'array',
            }
            client.query(query, (err,ras) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.send(ras)
                }
            })
        }
    })
})

app.post('/workerlistprovider',(req,res) => {
    var usr_id = req.body.usr_id;
    const query = {
        text: 'SELECT PRO_ID FROM PRODATA WHERE USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,response) => {
        if (err) {
            console.log(err.stack)
            res.send(400)
        } else {
            console.log(response.rows[0][0])
            const query = {
                text: 'SELECT PROTEC.TEC_ID, USERS.USR_ID, USERS.USR_NAME, USERS.USR_PHONE, USERS.USR_EMAIL, TECDATA.TEC_CAT, TECDATA.TEC_QUANT, TECDATA.TEC_QUALY, PROTEC.DATE_IN, PROTEC.HOUR FROM PROTEC, TECDATA, USERS WHERE PROTEC.PRO_ID=$1 AND PROTEC.TEC_ID=TECDATA.TEC_ID AND TECDATA.USR_ID=USERS.USR_ID',
                values: [response.rows[0][0]],
                rowMode: 'array',
            }
            client.query(query, (err,ras) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.send(ras)
                }
            })
        }
    })
})

app.post('/teclist',(req,res) => {
    client.query('SELECT TECDATA.TEC_ID, TECDATA.USR_ID, TECDATA.TEC_CAT, TECDATA.TEC_HOUR, TECDATA.TEC_COST, TECDATA.TEC_STAT, TECDATA.TEC_QUALY, TECDATA.TEC_QUANT, USERS.USR_NAME, USERS.USR_PHONE, USERS.USR_EMAIL, USERS.USR_ADDRESS, DATE_IN FROM TECDATA, USERS WHERE TECDATA.USR_ID = USERS.USR_ID', (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
            console.log(response)
        }
    })
})

app.post('/workeredit',(req,res) => {
    var tec_cat = req.body.tec_cat;
    var tec_hour = req.body.tec_hour;
    var tec_cost = req.body.tec_cost;
    var usr_id = req.body.usr_id;

    const query = {
        text: 'UPDATE TECDATA SET TEC_CAT = $1, TEC_HOUR = $2, TEC_COST = $3 WHERE USR_ID = $4',
        values: [tec_cat, tec_hour, tec_cost, usr_id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log(response)
            res.sendStatus(201)
        }
    })

})

app.post('/workerid',(req,res) => {
    var userid = req.body.userid;
    const query = {
        text: 'SELECT * FROM TECDATA WHERE USR_ID = $1',
        values: [userid],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/providerid',(req,res) => {
    var userid = req.body.userid;
    const query = {
        text: 'SELECT * FROM PRODATA WHERE USR_ID = $1',
        values: [userid],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
            console.log(response)
        }
    })
})

app.post('/provideredit',(req,res) => {
    var open = req.body.open;
    var usr_id = req.body.usr_id;
    var usr_address = req.body.usr_address;
    var usr_phone = req.body.usr_phone
    var usr_email = req.body.usr_email

    const query = {
        text: 'UPDATE PRODATA SET OPEN = $1 WHERE USR_ID = $2',
        values: [open, usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const query2 = {
                text: 'UPDATE USERS SET USR_ADDRESS = $1, USR_PHONE = $2, USR_EMAIL = $3 WHERE USR_ID = $4',
                values: [usr_address, usr_phone, usr_email, usr_id],
                rowMode: 'array',
            }
            client.query(query2, (err,) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201)
                }
            })
        }
    })

})

app.post('/spare/name',(req,res) => {
    client.query('SELECT * FROM SPARES', (err, response) => {
        if (err) {
            console.log(err.stack)
            res.send(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/edituser',(req,res) => {
    var id = req.body.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.address;
    var pass = req.body.password;
    var flag = req.body.flag;
    //client.query('UPDATE TEST SET NAME = \'cinco\' WHERE ID = 5', (err, res) => {
    const query = {
        text: 'UPDATE USERS SET USR_NAME = $1, USR_PHONE = $2, USR_EMAIL = $3, USR_ADDRESS = $4, USR_PSW = $5, FLAG_ID = $6 WHERE USR_ID = $7',
        values: [name, phone, email, address, pass, flag, id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.send(400)
        } else {
            console.log('[201] Aceptado')
            res.sendStatus(201);
        }
    }) 
})

app.post('/register',(req,res) => {
    var email = req.body.email;
    var pswd = req.body.pass;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var ccode = req.body.nationality;
    console.log('[102] Un usuario intenta registrarse. email: '+ email + ' pswd: ' + pswd + ' name: ' + name + ' address: ' + address + ' phone: ' + phone + ' ccode: ' + ccode);
    const query = {
        text: 'INSERT INTO USERS(USR_EMAIL,USR_PSWD,USR_NAME,USR_ADDRESS,USR_PHONE,FLAG_ID,USR_TYPE) VALUES ($1, $2, $3, $4, $5, $6, 0)',
        values: [email, pswd, name, address, phone, ccode],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.send(400)
        } else {
            console.log('[201] Aceptado')
            res.sendStatus(201);
        }
    })   
});

app.post('/login',(req,res) => {
    var phone = req.body.phone;
    var pswd = req.body.pass;
    console.log('[102] Un usuario intenta identificarse con el numero: '+ phone + ' contraseña: ' + pswd);

    const query = {
        text: 'SELECT USR_ID, USR_PSWD FROM USERS WHERE USR_PHONE = $1',
        values: [phone],
        rowMode: 'array',
    }

    client.query(query, (err, response) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            
            if(response.rowCount == 0) { console.log('[404] Este telefono no existe en la base'); res.sendStatus(404); }
            else {
                console.log('Contraseña query: ' + response.rows[0][1] + ' id: ' + response.rows[0][0])
                if(response.rows[0][1] == pswd) {
                    console.log('[202] Aceptado')
                    res.sendStatus(202);
                } else {
                    console.log('[403] Rechazado')
                    res.sendStatus(403);
                }
            }
        }
    })
})

app.post('/id',(req,res) => {
    var phone = req.body.phone;
    const query = {
        text: 'SELECT USR_ID,USR_NAME,USR_EMAIL,USR_PHONE,USR_ADDRESS,FLAG_ID,USR_TYPE,USR_PHONE FROM USERS WHERE USR_PHONE = $1',
        values: [phone],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        res.send(response)
    })
})

app.post('/yachtlist',(req,res) => {
    var userid = req.body.userid;
    var date = new Date();

    const query = {
        text: 'SELECT SHIPS.* FROM SHIPS,SHIPUS WHERE SHIPUS.USR_ID = $1 AND SHIPUS.SHIP_ID = SHIPS.SHIP_ID',
        values: [userid],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/yachtpartslist',(req,res) => {
    var ship_id = req.body.ship_id;

    const query = {
        text: 'SELECT PARTS.*, SHIPARTS.* FROM PARTS,SHIPARTS WHERE SHIPARTS.SHIP_ID = $1 AND SHIPARTS.PART_ID = PARTS.PART_ID',
        values: [ship_id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
            console.log(response)
        }
    })
})

app.post('/deletepart',(req,res) => {
    var part_id = req.body.part_id;
    const query = {
        text: 'DELETE FROM PARTS WHERE PART_ID = $1',
        values: [part_id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const query2 = {
                text: 'DELETE FROM SHIPARTS WHERE PART_ID = $1',
                values: [part_id],
                rowMode: 'array',
            }    
            client.query(query2, (err, responD) => {
                if (err) {
                    console.log('[400] Se ha producido un error en la query:')
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201);  
                    console.log(responD)        
                }
            })   
        }
    })
})

app.post('/addpartyacht',(req,res) => {
    var part_name = req.body.part_name;
    var part_model = req.body.part_model;
    var part_brand = req.body.part_brand;
    var part_capacity = req.body.part_capacity;
    var part_power = req.body.part_power;
    var part_type = req.body.part_type;
    var ship_id = req.body.ship_id;
    console.log(part_name +' ' + part_model + ' ' + part_brand + ' ' + ship_id)
    const query = {
        text: 'INSERT INTO PARTS (PART_NAME,PART_TYPE,PART_BRAND,PART_MODEL,PART_POWER,PART_CAPACITY) VALUES ($1,$2,$3,$4,$5,$6) RETURNING PART_ID',
        values: [part_name,part_type,part_brand,part_model,part_power,part_capacity],
        rowMode: 'array',
    }
    client.query(query, (err, partresponse) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log(partresponse)
            const queryUser = {
                text: 'INSERT INTO SHIPARTS (SHIP_ID,PART_ID,quantity) VALUES ($1, $2, 1)',
                values: [ship_id, partresponse.rows[0][0]],
                rowMode: 'array',
            }
            client.query(queryUser, (err, response) => {
                if (err) {
                    console.log('[400] Se ha producido un error en la query:')
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201);  
                    console.log(response)        
                }
            })
        }
    })
})

app.post('/addspare',(req,res) => {
    var userid = req.body.userid;
    var spar_name = req.body.name;
    var spar_brand = req.body.brand;
    var spar_desc = req.body.desc;
    var stock = req.body.stock;
    var price = req.body.price;
    
    console.log('[102] El usuario ' + userid + ' intenta registrar un nuevo repuesto');

    const query = {
        text: 'INSERT INTO SPARES(SPAR_NAME,SPAR_BRAND,SPAR_DESC) VALUES ($1, $2, $3) RETURNING SPAR_ID',
        values: [spar_name, spar_brand, spar_desc],
        rowMode: 'array',
    }
    console.log(userid)
    client.query(query, (err, spar_id) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const queryUser = {
                text: 'SELECT PRO_ID FROM PRODATA WHERE USR_ID = $1',
                values: [userid],
                rowMode: 'array',
            }
            client.query(queryUser, (err, pro_id) => {
                if (err) {
                    console.log('[400] Se ha producido un error en la query:')
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    console.log(pro_id.rows[0][0] + ' ' + spar_id.rows[0][0])
                    const query3 = {
                        text: 'INSERT INTO PROVSPA(PROV_ID,SPAR_ID,STOCK,PRICE) VALUES ($1,$2,$3,$4)',
                        values: [pro_id.rows[0][0], spar_id.rows[0][0],stock, price],
                        rowMode: 'array',
                    }
                    client.query(query3, (err, response) => {
                        if (err) {
                            console.log('[400] Se ha producido un error en la query:')
                            console.log(err.stack)
                            res.sendStatus(400)
                        } else {
                            console.log(response);
                            res.sendStatus(201);          
                        }
                    })
                }
            })
        }
    })
})

app.post('/addyacht',(req,res) => {
    var userid = req.body.userid;
    var name = req.body.name;
    var model = req.body.model;
    var year = req.body.year;
    var plate = req.body.plate;
    var ccode = req.body.ccode;
    var date = new Date();
    

    console.log('[102] El usuario ' + userid + ' intenta registrar un nuevo barco');

    const query = {
        text: 'INSERT INTO SHIPS(SHIP_NAME,SHIP_MODEL,SHIP_YEAR,SHIP_PLATE,FLAG_ID,SHIP_STAT,SHIP_IN) VALUES ($1, $2, $3, $4, $5, 1, $6) RETURNING SHIP_ID',
        values: [name, model, year, plate, ccode, date],
        rowMode: 'array',
    }

    client.query(query, (err, shipresponse) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            var ship_id = shipresponse.rows[0][0];
            const queryUser = {
                text: 'INSERT INTO SHIPUS(SHIP_ID,USR_ID,DATE_IN) VALUES ($1, $2, $3)',
                values: [ship_id, userid, date],
                rowMode: 'array',
            }
            client.query(queryUser, (err, shipusresponse) => {
                if (err) {
                    console.log('[400] Se ha producido un error en la query:')
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    console.log('[201] El usuario ' + userid + ' registro el barco: '+ name + ' id: ' + ship_id + ' modelo: ' + model + ' año: ' + year + ' plate: ' + plate + ' ccode: ' + ccode + ' date: ' + date);
                    res.sendStatus(201);          
                }
            })
        }
    })
})

app.post('/edityacht',(req,res) => {
    var name = req.body.name;
    var model = req.body.model;
    var year = req.body.year;
    var plate = req.body.plate;
    var ccode = req.body.ccode;
    var id = req.body.id;
    console.log('[102] Un usuario intenta editar el barco: '+ name + ' modelo: ' + model + ' año: ' + year + ' plate: ' + plate + ' ccode: ' + ccode);
    const query = {
        text: 'UPDATE SHIPS SHIP_NAME = $1, SHIP_MODEL = $2, SHIP_YEAR = $3, SHIP_PLATE = $4, FLAG_ID = $5 WHERE SHIP_ID = $6',
        values: [name, model, year, plate, ccode, id],
        rowMode: 'array',
    }

    client.query(query, (err, response) => {
        if (err) {
            console.log('[400] Se ha producido un error en la query:')
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log('[201] Aceptado')
            res.sendStatus(201);
        }
    })
})

app.post('/servicerequest',(req,res) => {
    var coordx = req.body.coordx;
    var coordy = req.body.coordy;
    var ship = req.body.ship;
    var requestDesc = req.body.requestDesc;
    var requestType = req.body.requestType;
    var userid = req.body.userid;
    var date = new Date();

    console.log(coordx + ' ' + coordy + ' ' + ship + ' ' + requestDesc + ' ' +requestType + ' ' + userid + ' ' + date)
    const query = {
        text: 'INSERT INTO SERVICES(SHIP_ID,USR_ID,SERV_REQ,SERV_DESC,SERV_CX,SERV_CY,SERV_CATEG,SERV_STAT) VALUES ($1,$2,$3,$4,$5,$6,$7,0) ',
        values: [ship, userid, date, requestDesc, coordx, coordy, requestType],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log('[201] El usuario ' + userid + ' a solicitado ayuda en las coordx: ' + coordx + ' coordy: ' + coordy)
            res.sendStatus(201);
        }
    })//
})

app.post('/requestslist',(req,res) => {

    const query = {
        text: 'SELECT SERVICES.SERV_ID,SHIPS.SHIP_ID,USERS.USR_ID,SERVICES.SERV_REQ,SERVICES.SERV_DESC,SERVICES.SERV_CX,SERVICES.SERV_CY,SERVICES.SERV_CATEG,SHIPS.SHIP_MODEL,SHIPS.SHIP_YEAR,USERS.USR_NAME,USERS.USR_PHONE FROM SERVICES,SHIPS,USERS WHERE SERVICES.SERV_STAT = 0 AND SERVICES.USR_ID = USERS.USR_ID AND SERVICES.SHIP_ID = SHIPS.SHIP_ID ORDER BY SERV_REQ DESC',
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/acceptrequest',(req,res) => {
    var usrtec_id = req.body.usr_id;
    var serv_id = req.body.serv_id;
    var cost = req.body.cost;
    var comment = req.body.comment;
    var ts_cx = req.body.ts_cx;
    var ts_cy = req.body.ts_cy
    var date = new Date();
    const query = {
        text: 'INSERT INTO TECSERV (SERV_ID, TEC_ID, TIME_INIT, TS_STAT, COST, COMM, TS_CX, TS_CY) SELECT $1,TEC_ID,$2,0,$4,$5,$6,$7 FROM TECDATA WHERE USR_ID=$3',
        //text: 'INSERT INTO TECSERV (SERV_ID, TEC_ID, TIME_INIT, TS_STAT, COST, COMM) VALUES ($1, SELECT TEC_ID FROM TECDATA WHERE USR_ID=$3, $2,0, $4, $5)',
        values: [serv_id, date, usrtec_id, cost, comment,ts_cx,ts_cy],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.sendStatus(201)
        }
    })
})

app.post('/requestuserlist',(req,res) => {
    var userid = req.body.userid;
    const query = {
        text: 'SELECT SERVICES.SERV_ID,SERVICES.SERV_DESC,SERVICES.SERV_CATEG,SERVICES.SERV_STAT,SERVICES.SHIP_ID,SHIPS.SHIP_MODEL,SHIPS.SHIP_NAME,SERVICES.SERV_STAT FROM SERVICES,SHIPS WHERE SERVICES.USR_ID = $1 AND SERVICES.SHIP_ID = SHIPS.SHIP_ID AND SERVICES.SERV_STAT != 3',
        values: [userid],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/offersrequest',(req,res) => {
    var serv_id = req.body.serv_id;
    const query = {
        text: 'SELECT TECSERV.SERV_ID,TECSERV.TEC_ID,TECSERV.TIME_INIT,TECSERV.COST,TECSERV.COMM,TECSERV.TS_CX,TECSERV.TS_CY,TECDATA.TEC_HOUR,TECDATA.TEC_QUALY,TECDATA.TEC_QUANT,USERS.USR_NAME,USERS.USR_PHONE,USERS.USR_EMAIL,TECSERV.TS_STAT FROM TECSERV,TECDATA,USERS WHERE TECSERV.SERV_ID=$1 AND TECSERV.TEC_ID=TECDATA.TEC_ID AND TECDATA.USR_ID=USERS.USR_ID',
        values: [serv_id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
        }
    })
})

app.post('/acceptoffer',(req,res) => {
    var serv_id = req.body.serv_id;
    var tec_id = req.body.tec_id;


    const query = {
        text: 'UPDATE TECSERV SET TS_STAT = 1 WHERE SERV_ID = $1 AND TEC_ID = $2',
        values: [serv_id, tec_id],
        rowMode: 'array',
    }
    client.query(query, (err,) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const query2 = {
                text: 'UPDATE SERVICES SET SERV_STAT = 1 WHERE SERV_ID = $1',
                values: [serv_id],
                rowMode: 'array',
            }
            client.query(query2, (err,) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.sendStatus(201)
                    console.log(query2)
                }
            })
        }
    })
})

app.post('/offerstate',(req,res) => {
    var usr_id = req.body.usr_id;


    const query = {
        text: 'SELECT SERVICES.SERV_ID, SERVICES.USR_ID, SERVICES.SERV_DESC, SERVICES.SERV_CATEG, USERS.USR_NAME, USERS.USR_PHONE, USERS.USR_EMAIL, TECSERV.COMM, TECSERV.COST, TECSERV.TS_STAT, SERVICES.SERV_CX, SERVICES.SERV_CY FROM SERVICES, USERS, TECSERV, TECDATA WHERE SERVICES.USR_ID = USERS.USR_ID AND TECSERV.SERV_ID = SERVICES.SERV_ID AND TECSERV.TEC_ID = TECDATA.TEC_ID AND TECDATA.USR_ID = $1 AND SERVICES.SERV_STAT != 3',
        //text: 'SELECT * FROM TECSERV, TECDATA WHERE TECSERV.TEC_ID = TECDATA.TEC_ID AND TECDATA.USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            res.send(response)
            console.log(response)
            console.log(usr_id)
        }
    })
})

app.post('/finishrequest',(req,res) => {
    var serv_id = req.body.serv_id;
    var tec_id = req.body.tec_id;
    var comm = req.body.comm;
    var qualy = req.body.rate;
    var date = new Date();

    const query = {
        text: 'UPDATE SERVICES SET SERV_QUALY = $1, SERV_COMM = $2, SERV_STAT = 3 WHERE SERV_ID = $3',
        values: [qualy, comm, serv_id],
        rowMode: 'array',
    }
    client.query(query, (er, resp) => {
        console.log('serv_id'+serv_id+' comm'+comm+' qualy'+qualy+' date')
        if (er) {
            console.log(er.stack)
            res.sendStatus(400)
        } else {
            const query2 = {
                text: 'UPDATE TECSERV SET QUALY = $1, TS_STAT = 2 WHERE SERV_ID = $2 AND TS_STAT = 1',
                values: [qualy, serv_id],
                rowMode: 'array',
            }
            console.log('uno')
            //
            client.query(query2, (err, respo) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    const query3 = {
                        text: 'UPDATE TECDATA SET TEC_QUALY = (SELECT AVG(QUALY) FROM TECSERV WHERE TEC_ID = $1), TEC_QUANT = TEC_QUANT+1 WHERE TECDATA.TEC_ID = $1',
                        values: [tec_id],
                        rowMode: 'array',
                    }
                    client.query(query3, (erro, response) => {
                        if (erro) {
                            console.log(erro.stack)
                            res.sendStatus(400)
                        } else {
                            console.log(response)
                            res.sendStatus(200)
                        }
                    })
                }
            })
        }
    })
})

app.post('/servicelist',(req,res) => {
    var usr_id = req.body.usr_id;
    console.log(usr_id)
    const query = {
        //SELECT TECSERV.SERV_ID,TECSERV.TEC_ID,TECSERV.TIME_INIT,TECSERV.COST,TECSERV.COMM,TECSERV.TS_CX,TECSERV.TS_CY,TECDATA.TEC_HOUR,TECDATA.TEC_QUALY,TECDATA.TEC_QUANT,USERS.USR_NAME,USERS.USR_PHONE,USERS.USR_EMAIL,TECSERV.TS_STAT FROM TECSERV,TECDATA,USERS WHERE TECSERV.SERV_ID=$1 AND TECSERV.TEC_ID=TECDATA.TEC_ID AND TECDATA.USR_ID=USERS.USR_ID
        text: 'SELECT TECDATA.TEC_ID FROM TECDATA WHERE USR_ID=$1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err, tec_id) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log(tec_id)
            const query = {
                text: 'SELECT TECSERV.SERV_ID, TECSERV.TIME_INIT, TECSERV.COST, TECSERV.QUALY, TECSERV.COMM, SERVICES.SERV_DESC, SERVICES.SERV_QUALY, SERVICES.SERV_CATEG, USERS.USR_ID, USERS.USR_NAME, USERS.USR_EMAIL, USERS.USR_PHONE, SHIPS.SHIP_MODEL, SHIPS.SHIP_YEAR FROM TECSERV, SERVICES, USERS, SHIPS WHERE TECSERV.SERV_ID=SERVICES.SERV_ID AND SERVICES.USR_ID=USERS.USR_ID AND SERVICES.SHIP_ID=SHIPS.SHIP_ID AND TECSERV.TEC_ID = $1 AND SERVICES.SERV_STAT=3',
                values: [tec_id.rows[0][0]],
                rowMode: 'array',
            }
            client.query(query, (err, response) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    res.send(response)
                    console.log(response)
                }
            })
        }
    })
    
})

app.post('/spareslistprovider',(req,res) => {
    var usr_id = req.body.usr_id;
    console.log(usr_id)
    const query = {
        text: 'SELECT PRO_ID FROM PRODATA WHERE USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err, pro_id) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            const query2 = {
                text: 'SELECT PROVSPA.SPAR_ID, PROVSPA.STOCK, PROVSPA.PRICE, PROVSPA.COST, SPARES.SPAR_NAME, SPARES.SPAR_DESC, SPARES.SPAR_BRAND FROM PROVSPA, SPARES WHERE PROVSPA.PROV_ID=$1 AND PROVSPA.SPAR_ID=SPARES.SPAR_ID',
                values: [usr_id],
                rowMode: 'array',
            }
            client.query(query2, (err, response) => {
                if (err) {
                    console.log(err.stack)
                    res.sendStatus(400)
                } else {
                    console.log(response)
                    res.send(response)
                }
            })
        }
    })
})

app.post('/changeuser',(req,res) => {
    var code = req.body.code;
    var usr_id = req.body.usr_id;
    var date = new Date();
    console.log(code)

    const query = {
        text: 'SELECT TEC_VALCOD, PRO_VALCOD FROM USERS WHERE USR_ID = $1',
        values: [usr_id],
        rowMode: 'array',
    }
    client.query(query, (err,resp) => {
        if (err) {
            console.log(err.stack)
            res.sendStatus(400)
        } else {
            console.log(resp)
            console.log(resp.rows[0])
            console.log(resp.rows[0][0])
            console.log(resp.rows[0][1])
            if(code == resp.rows[0][0]) { //el usuario se convierte en un worker o technique
                const query = {
                    text: 'INSERT INTO TECDATA(USR_ID,TEC_QUANT,TEC_STAT,TEC_QUALY) VALUES ($1,0,1,3)',
                    values: [usr_id],
                    rowMode: 'array',
                }
                client.query(query, (err,) => {
                    if (err) {
                        console.log(err.stack)
                        res.sendStatus(400)
                    } else {
                        const query2 = {
                            text: 'UPDATE USERS SET USR_TYPE = 1 WHERE USR_ID = $1',
                            values: [usr_id],
                            rowMode: 'array',
                        }
                        client.query(query2, (err, response) => {
                            if (err) {
                                console.log(err.stack)
                                res.sendStatus(400)
                            } else {
                                console.log(response)
                                res.sendStatus(201)
                            }
                        })        
                    }
                })
            } else if(code == resp.rows[0][1]) { //el usuario se convierte en un provider
                const query = {
                    text: 'INSERT INTO PRODATA(USR_ID) VALUES ($1)',
                    values: [usr_id],
                    rowMode: 'array',
                }
                client.query(query, (err,) => {
                    if (err) {
                        console.log(err.stack)
                        res.sendStatus(400)
                    } else {
                        const query2 = {
                            text: 'UPDATE USERS SET USR_TYPE = 2 WHERE USR_ID = $1',
                            values: [usr_id],
                            rowMode: 'array',
                        }
                        client.query(query2, (err, response) => {
                            if (err) {
                                console.log(err.stack)
                                res.sendStatus(400)
                            } else {
                                console.log(response)
                                res.sendStatus(202)
                            }
                        }) 
                    }
                })
            } else {
                res.sendStatus(400)
                console.log('Codigo no valido')
            }
            
        }
    })
})

//------------------------------------------- WEB --------------------------------------------

app.post('/signupweb',(req,res) => {
    var username = req.body.user;
    var password = req.body.pass;


    res.send(200)
})

//------------------------------- NO TOCAR ----------

app.listen(3000, () => {
    console.log(app.get('appName'))
    console.log('server on port 3000')
})