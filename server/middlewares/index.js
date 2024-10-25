import cors from 'cors';
import bodyParser from 'body-parser';

export const setupMiddlewares = (app) => {
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());
};