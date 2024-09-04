import express from 'express'; // framework web
import bodyParser from 'body-parser'; // middleware para parsear o corpo das requisições
import knex from 'knex';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function olaMundo(req, res) {
    res.send('Olá mundo!');
}
app.get('/', olaMundo);

const bancoDeDados = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'user-tarefa',
        database: 'tarefas',
        password: 'passwd',
        ssl: false,
    },
});

// Acrônimo CRUD

// C - Create
app.post('/tarefa', async (req, res) => {
    const tarefa = req.body;
    const novaTarefa = { nome: tarefa.nome };
    // INSERT INTO tarefas (nome, feita) VALUES (novaTarefa.nome, novaTarefa.feita);
    const tarefaDoBanco = await bancoDeDados('tarefas').insert(novaTarefa).returning('*');
    // const query = `INSERT INTO tarefas (nome, feita) VALUES ('${tarefa.nome}', FALSE) RETURNING *`;
    // const tarefaDoBanco = await bancoDeDados.raw(query);
    res.json(tarefaDoBanco);
});

// R - Read
app.get('/tarefas', async (req, res) => {
    const filtro = req.query;
    const tarefas = await bancoDeDados('tarefas').select('*').where(filtro); // SELECT * FROM tarefas;
    res.json(tarefas);
});

// U - Update
app.patch('/tarefa/:id', async (req, res) => {
    const tarefa = req.body;
    const id = req.params.id;
    await bancoDeDados('tarefas').update(tarefa).where({ id });
    res.json(tarefa);
});

// D - Delete
app.delete('/tarefa/:id', async (req, res) => {
    const id = req.params.id;
    await bancoDeDados('tarefas').delete().where({ id });
    res.json({ id });
});

// -----------------------------------------
// -------------- Fim Tarefas --------------
// -----------------------------------------


function imprimirServidorRodando() {
    console.log(`O servidor está rodando na porta ${PORT}`);
}
app.listen(PORT, imprimirServidorRodando);