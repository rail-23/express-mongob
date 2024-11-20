import Role from '../models/Role';

export const crearRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        await Promise.all([
            new Role({ name: 'estudiante' }).save(),
            new Role({ name: 'profesor' }).save(),
            new Role({ name: 'director' }).save()
        ]);

        console.log("Roles inicializados correctamente");
    } catch (error) {
        console.error(error);
    }
};
