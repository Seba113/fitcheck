require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res)=> {
    res.json(
        {
            status: 'ok',
            message: 'Fitcheck API fucionando'
        }
    );
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('conectado a MongoDB');
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
    })
    .catch((err) => console.error('Error conectando a MongoDB:', err))