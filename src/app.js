import express from 'express';
import { globalErrorHandellar, middleware, notFoundHandellar } from './middleware/index.js';
import  router  from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import OpenApiValidator  from 'express-openapi-validator';
import YAML from 'yamljs';
const swaggerSpec = YAML.load('./swagger.yaml');

const app = express();

// Global middleware set
app.use(middleware);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(OpenApiValidator.middleware({
    apiSpec: './swagger.yaml',
}))

// Route
app.use('/api/v1' , router)


// Global error handler
app.use([notFoundHandellar, globalErrorHandellar]);


export default app
