const pgp = require("pg-promise")();
const fs = require('fs');

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'amba',
    user: 'postgres',
    password: '1234'
};

const db = pgp(process.env.DATABASE_URL || cn);

const archivo = process.argv[2];


const array = fs.readFileSync(archivo).toString().split("\n");
for (let i = 0; i < (array.length -1); i++){
    const campos = array[i].toString().split(";");
    db.none('insert into asistentes (cod, nombre, institucion) VALUES ($1, $2, $3);', [i + 10001, campos[0] + ' ' + campos[1], campos[2]])
        .then(() => {
            console.log('Insertado ' + (i + 10001));
        })
        .catch(err => {
            console.log(err);
        })
}