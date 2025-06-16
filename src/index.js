const express = require('express');
const cocktailsRouter = require('./routes/cocktails');

const app = express();
app.use(express.json());
app.use('/api/cocktails', cocktailsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));