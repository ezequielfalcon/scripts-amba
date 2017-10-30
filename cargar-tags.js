const pgp = require("pg-promise")();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'amba',
    user: 'postgres',
    password: '1234'
};

const db = pgp(process.env.DATABASE_URL || cn);


for (let i = 0; i < (1600); i++){
    db.none('insert into tags (cod, uid) VALUES ($1, $2);', [i + 99001, (i + 99001) + '00000000000000000000'])
        .then(() => {
            console.log('Insertado ' + (i + 99001));
        })
        .catch(err => {
            console.log(err);
        })
}