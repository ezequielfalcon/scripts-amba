const pgp = require("pg-promise")();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'amba',
    user: 'postgres',
    password: '1234'
};

const db = pgp(process.env.DATABASE_URL || cn);


for (let i = 0; i < (15); i++){
    db.one('select id from asistentes where cod = $1;', (i + 10001) + "")
        .then(asistenteId => {
            db.one('select id from tags where cod = $1;', (i + 99001) + "")
                .then(tagId => {
                    db.none('insert into tag_por_asistente (id_asistente, id_tag) VALUES ($1, $2);', [asistenteId.id, tagId.id])
                        .then(() => {
                            console.log('enrolado ' + asistenteId.id + ' con ' + tagId.id);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}