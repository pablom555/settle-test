// Puerto para correr en entorno local
process.env.PORT = process.env.PORT | 3000;

// Ruta BBDD local
process.env.URLDB = 'mongodb://localhost:27017/settle';

// APIKEY Fixer Dev
process.env.APIKEY_FIXER = 'ffcc344a3f31700c0020d166fd17ea96';
process.env.URL_API_FIXER = 'http://data.fixer.io/api/latest';