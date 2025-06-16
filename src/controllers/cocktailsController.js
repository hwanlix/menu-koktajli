const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'cocktails.json');

function readData() {
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

let cocktails = readData();

exports.getAll = (req, res) => res.json(cocktails);

exports.getById = (req, res) => {
  const found = cocktails.find(c => c.id === +req.params.id);
  return found ? res.json(found) : res.status(404).json({ error: 'Not found' });
};

exports.create = (req, res) => {
  const nextId = cocktails.length ? Math.max(...cocktails.map(c => c.id)) + 1 : 1;
  const newCocktail = { id: nextId, ...req.body };
  cocktails.push(newCocktail);
  writeData(cocktails);
  res.status(201).json(newCocktail);
};

exports.update = (req, res) => {
  const idx = cocktails.findIndex(c => c.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  cocktails[idx] = { id: +req.params.id, ...req.body };
  writeData(cocktails);
  res.json(cocktails[idx]);
};

exports.remove = (req, res) => {
  const idx = cocktails.findIndex(c => c.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = cocktails.splice(idx, 1)[0];
  writeData(cocktails);
  res.json(removed);
};