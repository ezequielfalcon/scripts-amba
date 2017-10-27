const pgp = require("pg-promise")();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'amba',
    user: 'postgres',
    password: '1234'
};

const db = pgp(process.env.DATABASE_URL || cn);


db.none('DELETE FROM tag_por_asistente;').then(() => {
    console.log('Enrolamientos borrados.');
    db.none('DELETE FROM tags;').then(() => {
        console.log('Tags borrados!');
    }, err => {
        console.error(err);
    })
}, err => {
    console.error(err);
});