import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { globalErrorHandellar, middleware, notFoundHandellar } from './middleware/index.js';
import  router  from './routes/index.js';
const swaggerSpec = YAML.load('./swagger.yaml')


const app = express();

// Global middleware set
app.use(middleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Route
app.use('/api/v1' , router)

// Global error handler
app.use([notFoundHandellar, globalErrorHandellar]);


export default {
    app,
}
