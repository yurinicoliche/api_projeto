const express = require('express');

const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());


let clientes = [];
let produtos = [];
let vendas = [];


app.get('/clientes', (req, res) => res.json(clientes));


app.post('/clientes', (req, res) => {
    const cliente = { id: uuidv4(), ...req.body };
    clientes.push(cliente);
    res.status(201).json(cliente);
});


app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });
    clientes[index] = { id, ...req.body };
    res.json(clientes[index]);
});


app.delete('/clientes/:id', (req, res) => {
    clientes = clientes.filter(c => c.id !== req.params.id);
    res.status(204).send();
});

-
app.get('/produtos', (req, res) => res.json(produtos));


app.post('/produtos', (req, res) => {
    const produto = { id: uuidv4(), ...req.body };
    produtos.push(produto);
    res.status(201).json(produto);
});


app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });
    produtos[index] = { id, ...req.body };
    res.json(produtos[index]);
});



app.delete('/produtos/:id', (req, res) => {
    produtos = produtos.filter(p => p.id !== req.params.id);
    res.status(204).send(`Produtos: ${produtos}`);
});

app.get('/vendas', (req, res) => res.json(vendas));


app.post('/vendas', (req, res) => {
    const { clienteId, produtosVendidos } = req.body;
    const venda = {
        id: uuidv4(),
        clienteId,
        produtosVendidos,
        data: new Date()
    };
    vendas.push(venda);
    res.status(201).json(venda);
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));