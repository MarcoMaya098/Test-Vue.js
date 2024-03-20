const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser
const mysql = require('mysql2');
const cors = require('cors');

const Categoria = require('./model/Categoria');
const Marca = require('./model/Marca');
const Producto = require('./model/Producto');

const PORT = 8080;
const app = express();

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

///GET

app.get('/api/getCategorias', async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
});

app.get('/api/getMarcas', async (req, res) => {
    const categorias = await Marca.findAll();
    res.json(categorias);
});


app.get('/api/getProductos', async (req, res) => {
    const categorias = await Producto.findAll();
    res.json(categorias);
});


///GET: ID
app.get('/api/getCategoria/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idCategoria);
        if (categoria) {
            res.status(200).json(categoria);
        }
        else{
            res.status(404).json({
                mensaje: 'Categoria not found'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al buscar la categoria',
        }) 
    }
});



app.get('/api/getMarca/:idMarca', async (req, res) => {
    const { idMarca } = req.params;
    try {
        const marca = await Marca.findByPk(idMarca);
        if (marca) {
            res.status(200).json(marca);
        }
        else{
            res.status(404).json({
                mensaje: 'Marca not found'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al buscar la Marca',
        }) 
    }
});


app.get('/api/getProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    try {
        const producto = await Producto.findByPk(idProducto);
        if (producto) {
            res.status(200).json(producto);
        }
        else{
            res.status(404).json({
                mensaje: 'Producto not found'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al buscar la Producto',
        }) 
    }
});


//POST 

app.post('/api/postCategoria', async (req, res) => {
    const { categoria } = req.body;

    try {
        const newCategoria = await Categoria.create({ categoria: categoria });
        res.status(200).json(newCategoria);
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al crear la categoria',
        })
    }

});


app.post('/api/postMarca', async (req, res) => {
    const { marca, idCategoria } = req.body;

    try {
        const newMarca = await Marca.create({ marca: marca, idCategoria: idCategoria });
        res.status(200).json(newMarca);
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al crear la marca',
        })
    }
});


app.post('/api/postProducto', async (req, res) => {
    const { nombreProducto, precio, stock, idMarca  } = req.body;

    try {
        const newProducto = await Producto.create({ nombreProducto: nombreProducto, precio: precio, stock: stock, idMarca: idMarca  });
        res.status(200).json(newProducto);
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al crear la marca',
        })
    }
});



//DELETE
app.delete('/api/deleteCategoria/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idCategoria);
        if (categoria) {
            await categoria.destroy(); 
            res.status(200).json({
                mensaje: 'Categoría eliminada'
            });
        } else {
            res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }
    } catch (error) {
        console.log('Error: ', error); // No es necesario el signo + antes de error
        res.status(500).json({
            mensaje: 'Error al eliminar la categoría',
        });
    }
});


app.delete('/api/deleteMarca/:idMarca', async (req, res) => {
    const { idMarca } = req.params;
    try {
        const marca = await Marca.findByPk(idMarca);
        if (marca) {
            await marca.destroy(); 
            res.status(200).json({
                mensaje: 'Marca eliminada'
            });
        } else {
            res.status(404).json({
                mensaje: 'Marca no encontrada'
            });
        }
    } catch (error) {
        console.log('Error: ', error); // No es necesario el signo + antes de error
        res.status(500).json({
            mensaje: 'Error al eliminar la Marca',
        });
    }
});

app.delete('/api/deleteProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    try {
        const producto = await Producto.findByPk(idProducto);
        if (producto) {
            await producto.destroy(); 
            res.status(200).json({
                mensaje: 'Producto eliminada'
            });
        } else {
            res.status(404).json({
                mensaje: 'Producto no encontrada'
            });
        }
    } catch (error) {
        console.log('Error: ', error); // No es necesario el signo + antes de error
        res.status(500).json({
            mensaje: 'Error al eliminar el Producto',
        });
    }
});

//PUT


app.put('/api/updateCategorias/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    const { categoria } = req.body;

    try {
        const categoriaExist = await Categoria.findByPk(idCategoria);
        if (categoriaExist) {
            await categoriaExist.update({ categoria: categoria });
            res.status(200).json({
                mensaje: 'Categoria modificada correctamente'
            });

        }else {
            res.status(404).json({
                mensaje: 'Categoria no encontrada'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al actualizar la categoria',
        })
    }
});


app.put('/api/updateMarca/:idMarca', async (req, res) => {
    const { idMarca } = req.params;
    const { marca, idCategoria } = req.body;

    try {
        const marcaExist = await Marca.findByPk(idMarca);
        if (marcaExist) {
            await marcaExist.update({ marca: marca, idCategoria: idCategoria});
            res.status(200).json({
                mensaje: 'Marca modificada correctamente'
            });

        }else {
            res.status(404).json({
                mensaje: 'Marca no encontrada'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al actualizar la Marca',
        })
    }
});



app.put('/api/updateProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    const { nombreProducto, precio, stock, idMarca  } = req.body;

    // const newProducto = await Producto.create({ nombreProducto: nombreProducto, precio: precio, stock: stock, idMarca: idMarca  });
    try {
        const productoExist = await Producto.findByPk(idProducto);
        if (productoExist) {
            await productoExist.update({ nombreProducto: nombreProducto, precio: precio, stock: stock, idMarca: idMarca });
            res.status(200).json({
                mensaje: 'Producto modificada correctamente'
            });

        }else {
            res.status(404).json({
                mensaje: 'Producto no encontrada'
            });
        }
    } catch (error) {
        console.log('Error ', + error);
        res.status(500).json({
            mensaje: 'Error al actualizar el Producto',
        })
    }
});

app.listen(PORT, () => console.log(`Estás vivo en http://localhost:${PORT}`));
