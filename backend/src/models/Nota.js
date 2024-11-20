import { Schema, model } from 'mongoose';

const notaSchema = new Schema({
    estudiante: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    materia: { type: String, required: true },
    calificacion: { type: Number, required: true },
}, {
    timestamps: true,
});

export default model('Nota', notaSchema);
