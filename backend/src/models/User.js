import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    nombre: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, enum: ["estudiante", "profesor", "director"], required: true }]
}, {
    timestamps: true,
    versionKey: false
});

// Métodos de encriptación
usuarioSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usuarioSchema.statics.comparePassword = async function (password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', usuarioSchema);
