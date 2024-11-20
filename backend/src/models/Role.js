export const ROLES = ['estudiante', 'profesor', 'director'];

import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: { type: String, required: true },
}, {
    versionKey: false,
});

export default model('Role', roleSchema);
