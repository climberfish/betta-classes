import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function olaMundo(req, res) {
    res.send('Olá mundo!');
}
app.get('/', olaMundo);


// -----------------------------------------
// ---------------- Tarefas ----------------
// -----------------------------------------
const tarefas = [
    { id: 1, feita: false, nome: 'Acordar' },
    { id: 2, feita: false, nome: 'Trabalhar' },
    { id: 3, feita: false, nome: 'Lavar louça' },
    { id: 4, feita: false, nome: 'Dormir' },
];

// Acrônimo CRUD

// C - Create
app.post('/tarefa', (req, res) => {
    const tarefa = req.body;
    const novaTarefa = {
        id: Math.round(Math.random() * 10000),
        nome: tarefa.nome,
        feita: false
    };
    tarefas.push(novaTarefa);
    res.json(novaTarefa);
});

// R - Read
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// U - Update
app.patch('/tarefa/:id', (req, res) => {
    const tarefa = req.body;
    const id = req.params.id;
    const indiceTarefa = tarefas.findIndex(tarefa => tarefa.id == id);
    tarefas[indiceTarefa] = { ...tarefas[indiceTarefa], ...tarefa };
    res.json(tarefas[indiceTarefa]);
});

// D - Delete
app.delete('/tarefa/:id', (req, res) => {
    const id = req.params.id;
    const indiceTarefa = tarefas.findIndex(tarefa => tarefa.id == id);
    tarefas.splice(indiceTarefa, 1);
    res.json({ id });
});

// -----------------------------------------
// -------------- Fim Tarefas --------------
// -----------------------------------------


function imprimirServidorRodando() {
    console.log(`O servidor está rodando na porta ${PORT}`);
}
app.listen(PORT, imprimirServidorRodando);