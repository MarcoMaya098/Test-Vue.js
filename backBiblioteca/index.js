const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Categoria = require('./model/Categoria');
const Subcategoria = require('./model/Subcategoria');
const Autor = require('./model/Autor');
const Titulo = require('./model/Titulo');
const TituloAutor = require('./model/TituloAutor');

const PORT = 9090;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Controlador GET
app.get('/api/getCategorias', async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
});

app.get('/api/getSubcategorias', async (req, res) => {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
});

app.get('/api/getAutores', async (req, res) => {
    const autores = await Autor.findAll();
    res.json(autores);
});

app.get('/api/getTitulos', async (req, res) => {
    const titulos = await Titulo.findAll();
    res.json(titulos);
});

app.get('/api/getTitulosAutores', async (req, res) => {
    try {
        const titulosAutores = await TituloAutor.findAll({
            attributes: ['idAutor', 'idTitulo'] 
        });
        res.json(titulosAutores);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

// Controlador GET:ID 
app.get('/api/getCategoria/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idCategoria);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({
                mensaje: 'Categoria not found'
            });
        }
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            mensaje: 'Error al buscar la categoria',
        });
    }
});



app.get('/api/getSubcategoria/:idSubcategoria', async (req, res) => {
    const { idSubcategoria } = req.params;
    try {
        const subcategoria = await Subcategoria.findByPk(idSubcategoria);
        if (subcategoria) {
            res.status(200).json(subcategoria);
        } else {
            res.status(404).json({
                mensaje: 'Subcategoria not found'
            });
        }
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            mensaje: 'Error al buscar la subcategoria',
        });
    }
});

app.get('/api/getAutor/:idAutor', async (req, res) => {
    const { idAutor } = req.params;
    try {
        const autor = await Autor.findByPk(idAutor);
        if (autor) {
            res.status(200).json(autor);
        } else {
            res.status(404).json({
                mensaje: 'Autor not found'
            });
        }
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            mensaje: 'Error al buscar el autor',
        });
    }
});

app.get('/api/getTitulo/:idTitulo', async (req, res) => {
    const { idTitulo } = req.params;
    try {
        const titulo = await Titulo.findByPk(idTitulo);
        if (titulo) {
            res.status(200).json(titulo);
        } else {
            res.status(404).json({
                mensaje: 'Titulo not found'
            });
        }
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            mensaje: 'Error al buscar el titulo',
        });
    }
});



// Controlador POST 
app.post('/api/createCategoria', async (req, res) => {
    const { categoria } = req.body;
    try {
        const newCategoria = await Categoria.create({
            categoria
        });
        res.status(201).json(newCategoria);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.post('/api/createSubcategoria', async (req, res) => {
    const { subcategoria, idCategoria } = req.body;
    try {
        const newSubcategoria = await Subcategoria.create({
            subcategoria,
            idCategoria
        });
        res.status(201).json(newSubcategoria);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.post('/api/createAutor', async (req, res) => {
    const { nombre, nacionalidad, correoElectronico } = req.body;
    try {
        const newAutor = await Autor.create({
            nombre,
            nacionalidad,
            correoElectronico
        });
        res.status(201).json(newAutor);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.post('/api/createTitulo', async (req, res) => {
    const { titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria } = req.body;
    try {
        const newTitulo = await Titulo.create({
            titulo,
            editorial,
            isbn,
            fechaPublicacion,
            noEjemplares,
            idSubcategoria
        });
        res.status(201).json(newTitulo);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});


app.post('/api/createTituloAutor', async (req, res) => {
    const { idAutor, idTitulo } = req.body;
    try {
        const newTituloAutor = await TituloAutor.create({
            idAutor,
            idTitulo
        });
        res.status(201).json(newTituloAutor);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});



// Controlador PUT 
app.put('/api/updateCategoria/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    const { categoria } = req.body;
    try {
        const categoriaToUpdate = await Categoria.findByPk(idCategoria);
        if (categoriaToUpdate) {
            await categoriaToUpdate.update({ categoria });
            res.status(200).json(categoriaToUpdate);
        } else {
            res.status(404).json({
                mensaje: 'Categoria not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.put('/api/updateSubcategoria/:idSubcategoria', async (req, res) => {
    const { idSubcategoria } = req.params;
    const { subcategoria, idCategoria } = req.body;
    try {
        const subcategoriaToUpdate = await Subcategoria.findByPk(idSubcategoria);
        if (subcategoriaToUpdate) {
            await subcategoriaToUpdate.update({ subcategoria, idCategoria });
            res.status(200).json(subcategoriaToUpdate);
        } else {
            res.status(404).json({
                mensaje: 'Subcategoria not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.put('/api/updateAutor/:idAutor', async (req, res) => {
    const { idAutor } = req.params;
    const { nombre, nacionalidad, correoElectronico } = req.body;
    try {
        const autorToUpdate = await Autor.findByPk(idAutor);
        if (autorToUpdate) {
            await autorToUpdate.update({ nombre, nacionalidad, correoElectronico });
            res.status(200).json(autorToUpdate);
        } else {
            res.status(404).json({
                mensaje: 'Autor not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.put('/api/updateTitulo/:idTitulo', async (req, res) => {
    const { idTitulo } = req.params;
    const { titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria } = req.body;
    try {
        const tituloToUpdate = await Titulo.findByPk(idTitulo);
        if (tituloToUpdate) {
            await tituloToUpdate.update({ titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria });
            res.status(200).json(tituloToUpdate);
        } else {
            res.status(404).json({
                mensaje: 'Titulo not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.put('/api/updateTituloAutor/:idAutor/:idTitulo', async (req, res) => {
    const { idAutor, idTitulo } = req.params;
    try {
        const tituloAutorToUpdate = await TituloAutor.findOne({
            where: { idAutor, idTitulo }
        });
        if (tituloAutorToUpdate) {
            await tituloAutorToUpdate.update(req.body);
            res.status(200).json(tituloAutorToUpdate);
        } else {
            res.status(404).json({
                mensaje: 'TituloAutor not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});



// Controlador DELETE 
app.delete('/api/deleteCategoria/:idCategoria', async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoriaToDelete = await Categoria.findByPk(idCategoria);
        if (categoriaToDelete) {
            await categoriaToDelete.destroy();
            res.status(200).json({ message: 'Categoria eliminada exitosamente' });
        } else {
            res.status(404).json({
                message: 'Categoria not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.delete('/api/deleteSubcategoria/:idSubcategoria', async (req, res) => {
    const { idSubcategoria } = req.params;
    try {
        const subcategoriaToDelete = await Subcategoria.findByPk(idSubcategoria);
        if (subcategoriaToDelete) {
            await subcategoriaToDelete.destroy();
            res.status(200).json({ message: 'Subcategoria eliminada exitosamente' });
        } else {
            res.status(404).json({
                message: 'Subcategoria not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.delete('/api/deleteAutor/:idAutor', async (req, res) => {
    const { idAutor } = req.params;
    try {
        const autorToDelete = await Autor.findByPk(idAutor);
        if (autorToDelete) {
            await autorToDelete.destroy();
            res.status(200).json({ message: 'Autor eliminado exitosamente' });
        } else {
            res.status(404).json({
                message: 'Autor not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.delete('/api/deleteTitulo/:idTitulo', async (req, res) => {
    const { idTitulo } = req.params;
    try {
        const tituloToDelete = await Titulo.findByPk(idTitulo);
        if (tituloToDelete) {
            await tituloToDelete.destroy();
            res.status(200).json({ message: 'Titulo eliminado exitosamente' });
        } else {
            res.status(404).json({
                message: 'Titulo not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

app.delete('/api/deleteTituloAutor/:idAutor/:idTitulo', async (req, res) => {
    const { idAutor, idTitulo } = req.params;
    try {
        const tituloAutorToDelete = await TituloAutor.findOne({
            where: { idAutor, idTitulo }
        });
        if (tituloAutorToDelete) {
            await tituloAutorToDelete.destroy();
            res.status(200).json({ message: 'Relación TituloAutor eliminada exitosamente' });
        } else {
            res.status(404).json({
                message: 'TituloAutor not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});


// Puerto 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




