import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.DB_URL);
        console.log("Conectado con éxito");
    } catch (error) {
        console.log("Fallo en la conexión con la base de datos");    }
};

//export default { connectDB };
