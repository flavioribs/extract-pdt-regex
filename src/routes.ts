import { Router } from 'express'
import MainController from './controllers/MainController'
import multer from 'multer';

const routes = Router()
const upload = multer({
    storage: multer.diskStorage({destination: '/tmp'})
});

routes.post('/', upload.single('file'), MainController.pdfToHTML)

export default routes