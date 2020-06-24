const express = require('express');
const session = require('express-session');
const router = express.Router();
const producto = require('../models/producto');
const inventario = require('../models/inventario');
const pedido = require('../models/pedido');
const Detalle_venta = require('../models/detalle_venta');
const detalle_venta = require('../models/detalle_venta');
const Venta = require('../models/venta');
const venta = require('../models/venta');
const empleado = require('../models/usuario');
const passport = require('../../config/passport');

router.use(passport.initialize());
router.use(passport.session());

	// index routes
	router.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	router.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});


	router.post('/login', function (req,res) {
				passport.authenticate('local-login', function(err, user) {
				if (err) { return res.sendStatus(404); }
				if (!user) { return res.sendStatus(404); }
				console.log("Usuario recibido")

				req.logIn(user, function(err) {
				if (err) { return next(err); }
					return res.sendStatus(201); //res.sendStatus(201) para mandar 201 y res.json(user) para mandar usuario
				});

			}) (req, res);
	});


	// signup view
	router.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/inicio',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));


	//profile view
	router.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	router.get('/logout', (req, res) => {
		req.logout();
		res.sendStatus(201);
	});

	router.get('/inicio', isLoggedIn, (req, res) =>{
		res.render('inicio', {user: req.user});
	});

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

//Administrar productos
router.get('/productos', async function(req, res){  //lista de productos, tiene buscador
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        await producto.find({codigo: regex}, function(err, producto){
           if(err){
               res.sendStatus(404);
           } else {

							/*res.render({
								user: req.user,
								producto: producto
							});*/
							res.json(producto);
					 }
        });
    } else {
        await producto.find({}, function(err, producto){
           if(err){
               console.log(err);
           } else {
              //res.render("productos",{user: req.user, producto: producto});
							res.json(producto);
           }
        });
    }
});

router.get('/agregar_prod', isLoggedIn, (req,res) =>{

    res.render('agregar_prod',{
        title: 'Agregar Producto'
    });

});

router.post('/agregar_prod', (req,res) => {
	let codigo = req.body.codigo.toUpperCase();
	let material = req.body.material.toUpperCase();
	let tipo = req.body.tipo.toUpperCase();
	let piedra = req.body.piedra.toUpperCase();
	let precio = req.body.precio;
	let descripcion = req.body.descripcion.toUpperCase();
	let sucursal = req.body.sucursal;
  producto.create({codigo: codigo, material: material, tipo: tipo, piedra: piedra, precio: precio, descripcion: descripcion, sucursal: sucursal}, (err) =>{
		if(!err){
     	res.sendStatus(201);
	}else{
     	res.sendStatus(404);
	}
  });
});

router.get('/delete_producto/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    producto.remove({_id: id}, (err, task) =>{
			if(!err){
     		res.sendStatus(201);
			}
			else{
     		res.sendStatus(404);
			}
    });
});

router.get('/editar_prod/:id', (req,res) =>{
    producto.findById(req.params.id, (err,producto) => {
			if(!err){
     		res.sendStatus(201);
			}
			else{
     		res.sendStatus(404);
			}

    });
});

router.post('/editar_prod/:id', function(req, res) {
	let id = req.params.id;
	let codigo = req.body.codigo.toUpperCase();
	let material = req.body.material.toUpperCase();
	let tipo = req.body.tipo.toUpperCase();
	let piedra = req.body.piedra.toUpperCase();
	let precio = req.body.precio;
	let descripcion = req.body.descripcion.toUpperCase();
	let sucursal = req.body.sucursal;
  producto.findByIdAndUpdate(id, {codigo: codigo, material: material, tipo: tipo, piedra: piedra, precio: precio, descripcion: descripcion, sucursal: sucursal}, function (err) {
		if(!err){
   		res.sendStatus(201);
		}
		else{
		   res.sendStatus(404);
		   console.log(err)
		}
  });
 });

 router.post('/delete_producto/:id', (req,res) =>{
    let id = req.params.id;
    producto.remove({_id: id}, (err, task) =>{
			if(!err){
     		res.sendStatus(201);
			}
			else{
     		res.sendStatus(404);
			}
    });
});


//Gestionar pedidos
router.get('/pedidos', async function(req, res){  //lista de productos, tiene buscador
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        await pedido.find({codigo: regex}, function(err, pedido){
           if(err){
               res.sendStatus(404)
           } else {
							res.json(pedido)
					 }
        });
    } else {
        await pedido.find({}, function(err, pedido){
           if(err){
               res.sendStatus(404)
           } else {
              //res.render("productos",{user: req.user, pedido: pedido});
							res.json(pedido);
           }
        });
    }
});

router.get('/agregar_pedido', isLoggedIn, (req,res) =>{
    res.render('agregar_pedido',{
        title: 'Agregar pedido'
    });

});

router.post('/agregar_pedido', (req,res) => {
	let fecha = req.body.fecha;
	let cliente = req.body.cliente.toUpperCase();
	let descripcion = req.body.descripcion.toUpperCase();
	let sucursal = req.body.sucursal;
	let estado = req.body.estado;
	let total = req.body.total;
    pedido.create({fecha: fecha, cliente: cliente, sucursal: sucursal, descripcion: descripcion, estado: estado, total: total}, (err) =>{
			if(!err){
	     res.sendStatus(201)
			}
			else{
				res.sendStatus(404)
				console.log(err)
				console.log(estado)
			}
    });
});

router.get('/delete_pedido/:id', (req,res) =>{
    let id = req.params.id;
    pedido.remove({_id: id}, (err, task) =>{
			if(!err){
				res.sendStatus(201)
			}
			else{
				res.sendStatus(404)
			}
    });
});

router.get('/editar_pedido/:id', (req,res) =>{
    pedido.findById(req.params.id, (err,pedido) => {
        if(!err){
					res.sendStatus(201)
        }
				else{
					res.sendStatus(404)
				}

    });
});

router.post('/eliminar_pedido/:id', (req,res) =>{
    let id = req.params.id;
    pedido.remove({_id: id}, (err, task) =>{
			if(!err){
     		res.sendStatus(201);
			}
			else{
     		res.sendStatus(404);
			}
    });
});

router.post('/editar_pedido/:id', function(req, res) {
	let id = req.body.id
	let fecha = req.body.fecha;
	let cliente = req.body.cliente.toUpperCase();
	let sucursal = req.body.sucursal;
	let descripcion = req.body.descripcion.toUpperCase();
	let estado = req.body.estado.toUpperCase();
	let total = req.body.total;
	pedido.findByIdAndUpdate(id,{fecha: fecha, cliente: cliente, sucursal: sucursal, descripción: descripcion, estado: estado, total: total}, function (err) {
		if(!err){
			res.sendStatus(201)
		}
		else{
			res.sendStatus(404)
	}
});
});

router.post('/editar_descripcion_pedido/:id', function(req, res) {
		let fecha = req.body.fecha;
		let cliente = req.body.cliente.toUpperCase();
		let sucursal = req.body.sucursal.toUpperCase();
		let descripcion = req.body.descripcion.toUpperCase();
		let estado = req.body.estado.toUpperCase();
		let total = req.body.total;
    pedido.findByIdAndUpdate(req.parmas.id,{cliente: cliente, sucursal: sucursal, descripción: descripcion, total: total}, function (err) {
			if(!err){
				res.sendStatus(201)
			}
			else{
				res.sendStatus(404)
		}
  });
});

router.post('/editar_estado_pedido/:id', function(req, res) {
		let fecha = req.body.fecha;
		let cliente = req.body.cliente.toUpperCase();
		let sucursal = req.body.sucursal.toUpperCase();
		let descripcion = req.body.descripcion.toUpperCase();
		let estado = req.body.estado.toUpperCase();
		let total = req.body.total;
    pedido.findByIdAndUpdate(req.params.id,{estado: estado}, function (err) {
			if(!err){
				res.sendStatus(201)
			}
			else{
				res.sendStatus(404)
		}
  });
});



//Realizar venta, se usa una lista para guardar los productos que desea el usuario
router.get('/lista_venta', isLoggedIn, (req,res) =>{
  			lista.find(function (err,lista) {
					if (!err){
						res.json(lista);
					}else{
						res.sendStatus(404);
					}
    });
});
/*
router.get('/ventasdia', async function(req,res) {
	if (req.query.search){
		const fecha1 = new Date().getDay(); // ejemplo: '2019/03/26'
		const fecha2 = new Date().getDay();
		const fi = fecha1.concat("T00:00:00-04:00");
		const ff = fecha2.concat("T23:59:00-04:00");
		console.log("1")
		await venta.find({$and: [{fecha: {$gte: new Date(fi)}},{fecha: {$lt: new Date(ff)}}]}, (err, venta) => {
			if(err) {
				res.sendStatus(404);
			}
			else{
				res.json(venta);
			}
		});
	}
	else{
		console.log("1")
		await venta.find({}, function(err,venta){
			if (err){
				res.sendStatus(404);
			}
			else{
				res.json(venta);
			}
		});
	}
});*/


router.post('/ventasdia', async function(req,res) {
		const fecha = req.body.dia;
		const fi = f.concat("T00:00:00-04:00");
		const ff = f.concat("T23:59:00-04:00");
		await venta.find({$and: [{fecha: {$gte: new Date(fi)}},{fecha: {$lt: new Date(ff)}}]}, (err, venta) => {
			if(err) {
				res.sendStatus(404);
			}
			else{
				res.json(venta);
			}
		});
});

router.get('/ventasperiodo', async function(req,res) {
	if (req.query.search){
		const fecha1 = req.body.desde;
		const fecha2 = req.body.hasta;


		await venta.find({$and: [{fecha: {$gte: new Date(fecha1)}},{fecha: {$lt: new Date(fecha2)}}]}, (err, venta) => {
			if(err) {
				res.sendStatus(404);
			}
			else{
				res.json(venta);
			}
		});
	}
});



router.get('/lista_productos', isLoggedIn, (req,res) => {
     producto.find(function (err,producto) {
			 if(!err){
				 lista.find((err, lista) => {
		        res.render('lista_productos',{
								user: req.user,
		            producto: producto,
								lista: lista
		        });
	    	});
			};
		});

});

/*router.get('/crear_venta', isLoggedIn, async (req,res) => {
	await venta.find({} , async (err, venta) => {

		if( venta.length == null && venta.length == 0 ){
			/*let num_venta = 1;
			let aux = req.body.fecha;
			let fecha = aux.concat("T00:00:00-04:00");
			let metodo_pago = req.body.metodo_pago.toUpperCase();
			let descuento = req.body.descuento;
			let total = req.body.total;
			let id_vendedor = req.body.id_vendedor.toUpperCase();
			let cliente = req.body.cliente.toUpperCase();

			venta.create({num_venta: num_venta, fecha: fecha, metodo_pago: metodo_pago, descuento: descuento,total: total, id_vendedor: id_vendedor, cliente: cliente}, (err) =>{
				if (err){
					res.sendStatus(404);
				}
				else{
					producto.find((err, producto) => {
				 	res.render('productos_venta',{
						 user: req.user,
						 producto: producto,
						 numero_venta: aux.numero_venta
					 });
				}
			});
			let aux = await new Venta({numero_venta: 1})
			await aux.save( (err, aux)=> {
			producto.find((err, producto) => {
				 res.render('productos_venta',{
						 user: req.user,
						 producto: producto,
						 numero_venta: aux.numero_venta
					 });
			 	});
			});
	}else{
		/*let num_venta = venta.length;
			let aux = req.body.fecha;
			let fecha = aux.concat("T00:00:00-04:00");
			let metodo_pago = req.body.metodo_pago.toUpperCase();
			let descuento = req.body.descuento;
			let total = req.body.total;
			let id_vendedor = req.body.id_vendedor.toUpperCase();
			let cliente = req.body.cliente.toUpperCase();

			venta.create({num_venta: num_venta, fecha: fecha, metodo_pago: metodo_pago, descuento: descuento,total: total, id_vendedor: id_vendedor, cliente: cliente}, (err) =>{
				if (err){
					res.sendStatus(404);
				}
				else{
					producto.find((err, producto) => {
				 	res.render('productos_venta',{
						 user: req.user,
						 producto: producto,
						 numero_venta: aux.numero_venta
					 });
				}
			});


let aux = await new Venta({numero_venta: venta.length});
		await aux.save( (err, aux)=> {
			producto.find((err, producto) => {
				 res.render('productos_venta',{
						 user: req.user,
						 producto: producto,
						 numero_venta: aux.numero_venta
				 });
		 	});
		});
	};
});
});*/


router.post('/crear_venta', async (req,res) => {
	let prods = req.body.lista;
	let fecha = Date.now();
	let metodo_pago = req.body.metodo_pago.toUpperCase();
	let descuento = req.body.descuento;
	let sucursal = req.body.sucursal.toString();
	let vendedor = req.body.vendedor.toUpperCase();
	let total = req.body.total;
	console.log(prods)
	console.log(fecha)
	console.log(metodo_pago)
	console.log(descuento)
	console.log(sucursal)
	console.log(vendedor)
	console.log(total)

	await venta.find({} , async (err, venta) => {
		if( venta.length == null && venta.length == 0 ){
			let aux = await new Venta({numero_venta: 1, fecha: fecha, metodo_pago: metodo_pago, descuento: descuento, sucursal: sucursal, vendedor: vendedor, total: total})
			await aux.save( (err, aux)=> {
				for(i = 0; i < prods.length; i++){
					detalle_venta.create({numero_venta: aux.numero_venta, cod_prod: prods[i]}, (err) => {
						if (err){res.sendStatus(404)}
					});
				}
				res.sendStatus(201)
			});
		}else{
			let aux = await new Venta({numero_venta: 1, fecha: fecha, metodo_pago: metodo_pago, descuento: descuento, sucursal: sucursal, vendedor: vendedor, total: total})
			await aux.save( (err, aux)=> {
				for(i = 0; i < prods.length; i++){
					detalle_venta.create({numero_venta: aux.numero_venta, cod_prod: prods[i]}, (err) => {
						if (err){res.sendStatus(404)}
					});
				}
				res.sendStatus(201)
			});
		};
	});
});


router.post('/eliminar_venta/:id', (req,res) =>{
    let id = req.params.id;
    venta.remove({_id: id}, (err, task) =>{
			if(!err){
     		res.sendStatus(201);
			}
			else{
     		res.sendStatus(404);
			}
    });
});




router.get('/detalle_venta_crear/:codProd/:numero_venta', isLoggedIn, async (req,res) => {
	let num = req.params.numero_venta;
	/*let det = await new Detalle_venta({numero_venta: num, cod_prod: req.params.codProd});
	await det.save()*/
	let cod_producto = req.params.codProd;
	await detalle_venta.create({numero_venta: num, cod_prod: cod_Prod})
		producto.find((err, producto) => {
			 res.render('productos_venta',{
					 user: req.user,
					 producto: producto,
					 numero_venta: num
			 });
	 });
});

router.get('/agregar_venta/:numVenta', isLoggedIn, (req,res) => {
		venta.findOne({numero_venta: req.params.numVenta}, (err, venta) =>{
			res.render('agregar_venta', {
				user: req.user,
				venta: venta
			});
		});
});



router.post('/agregar_venta/:id', function(req, res) {
    venta.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.sendStatus(404);
    } else {
      res.redirect('../venta');
    }
    });
  });


//Gestionar empleados
router.get('/empleados', isLoggedIn, (req,res) =>{
    empleado.find(function (err,empleado) {
        res.render('empleados',{
						user: req.user,
            empleado: empleado
        });
    });

});

router.get('/delete_empleado/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    empleado.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/empleados');
    }
		else{
			res.redirect('/inicio');
		}
	});
});

router.get('/editar_empleado/:id', (req,res) =>{
    empleado.findById(req.params.id, (err,empleado) => {
        if(!err){
            res.render('editar_empleado',{
                title: 'Actualizar datos del Empleado',
                empleado: empleado
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_empleado/:id', function(req, res) {
    empleado.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('editar_empleado/'+req.params.id);
    } else {

      res.redirect('../empleados');
    }
    });
  });




module.exports = router;
