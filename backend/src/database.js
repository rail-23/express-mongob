import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost/gestion-user')
        .then(db => console.log('base de dato conectado'))
        .catch(error => console.log(error)) 