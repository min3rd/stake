const swaggerAutogen = require('swagger-autogen')()

const env = process.argv[1]
let host = 'localhost:80';
let schemes = ['http', 'https'];
if (env === 'prod') {
    host = 'api.coinmarket.bet';
}

const doc = {
    info: {
        title: 'Coinmarket API Document',
        description: 'Description',
    },
    host: host,
    basePath: '/api/v1/public',
    schemes: schemes,
};
const outputFile = './public/json/public.doc.json'
const endpointsFiles = ['./routes/publicRoute.js']

swaggerAutogen(outputFile, endpointsFiles, doc)