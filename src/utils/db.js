

const { dbusername, dbpassword } = process.env

const connectionSrt = "mongodb+srv://" + dbusername + ":" + dbpassword + "@cluster0.yrj1v.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0";

export default connectionSrt;



