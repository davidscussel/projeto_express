const client = require('mongodb').MongoClient;

module.exports = class banco{
    static async find(dado){
        const conn = await client.connect('mongodb://127.0.0.1:27017/banco');
        const db=conn.db();
        const resp=await db.collection('users').find(dado).toArray();
        conn.close();
        return resp;
    };
    static async insert(dado){
        const conn = await client.connect('mongodb://127.0.0.1:27017/banco');
        const db=conn.db();
        const resp=await db.collection('users').insertOne(dado);
        conn.close();
        return "ok";
    }
};