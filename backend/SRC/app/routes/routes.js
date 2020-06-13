const express = require('express');
const router = express.Router();
const producto = require('../models/producto');
const inv_prod = require('../models/inv_prod');
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

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/inicio',
		failureRedirect: '/login',
		failureFlash: true
	}));

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
		res.redirect('/');
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
               console.log(err);
           } else {
							res.json({
								user: req.user,
								producto: producto
							);
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

router.get('/asd', function(req, res) {

	 res.json([{
	   id: "5ec49fc573d1885c64d14065",
	   codigo:'1132238',//
	   tipo: 'collar',
	   material: 'Oro',
	   piedra: 'No tiene',
	   cantidad: 5,
	   precio: 50000,
	   descripcion: "aaaaaaaaaaaaasd"
	 }, {
		id: "5ec49fc573d188asdadasd5c64d14065",
		codigo:'1132238',//
		tipo: 'asdasdsad',
		material: 'Oro',
		piedra: 'No tiene',
		cantidad: 5,
		precio: 50000,
		descripcion: "asd"
	 }]);
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
	let precio = req.body.precio.toUpperCase();
	let descripcion = req.body.descripcion.toUpperCase();
	let sucursal = req.body.sucursal;

  producto.create({codigo: codigo, material: material, tipo: tipo, piedra: piedra, precio: precio, descripcion: descripcion, sucursal: sucursal}, (err) =>{
		if(!err){
     	res.sendStatus(201);
	}else{
			console.log(err);
	}
  });
});

router.get('/delete_producto/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    producto.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/productos');
			}
			else{
					res.redirect('/inicio');
			}
    });
});

router.get('/editar_prod/:id', (req,res) =>{
    producto.findById(req.params.id, (err,producto) => {
        if(!err){
            res.render('editar_prod',{
                title: 'Actualizar',
                producto: producto
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_prod/:id', function(req, res) {
    producto.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('editar_prod/'+req.params.id);
    } else {

      res.redirect('../producto');
    }
    });
  });


//Gestionar pedidos
router.get('/pedidos', async function(req, res){  //lista de productos, tiene buscador
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        await pedido.find({codigo: regex}, function(err, pedido){
           if(err){
               console.log(err);
           } else {  
							res.json({
								user: req.user,
								producto: producto
							););
					 }
        });
    } else {
        await pedido.find({}, function(err, pedido){
           if(err){
               console.log(err);
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

router.post('/agregar_pedido', isLoggedIn, (req,res) => {
    let body = req.body;
    pedido.create(body, (err) =>{
			if(!err){
       res.redirect('/pedidos');
		 }
		 else{
			 console.log(err);
			 res.redirect('/inicio');
		 }
    });
});

router.get('/delete_pedido/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    pedido.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/pedidos');
			}
			else{
				res.redirect('/pedido');
			}
    });
});

router.get('/editar_pedido/:id', (req,res) =>{
    pedido.findById(req.params.id, (err,pedido) => {
        if(!err){
            res.render('editar_pedido',{
                title: 'Actualizar Pedido',
                pedido: pedido
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_pedido/:id', function(req, res) {
    pedido.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('/inicio');
    } else {

      res.redirect('../pedidos');
    }
    });
  });



//Realizar venta, se usa una lista para guardar los productos que desea el usuario
router.get('/lista_venta', isLoggedIn, (req,res) =>{
  			lista.find(function (err,lista) {
					if (!err){
        		res.render('lista_venta',{
								user: req.user,
            		lista: lista
        	});
					}else{
						res.redirect('/inicio');
					}
    });
});



router.get('/venta', isLoggedIn, (req,res) =>{
       res.render('venta', {
				 user: req.user
			 });
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

router.get('/crear_venta', isLoggedIn, async (req,res) => {
	await venta.find({} , async (err, venta) => {

		if( venta.length == null || venta.length == 0 ){
			let aux = await new Venta({numero_venta: 1} );
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
		let aux = await new Venta({numero_venta: venta.length} );
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
});


router.get('/detalle_venta_crear/:codProd/:numero_venta', isLoggedIn, async (req,res) => {
	let num = req.params.numero_venta;
	/*let det = await new Detalle_venta({numero_venta: num, cod_prod: req.params.codProd});
	await det.save()*/
	await detalle_venta.create({numero_venta: num, cod_prod: req.params.codProd})
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
        res.redirect('/inicio');
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
