const app = require('./app')
const PORT = 3001;
const HOST = '0.0.0.0';

process.env.JWTSecret = 'secret'; // This would be set by an .env file

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);