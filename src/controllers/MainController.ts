import { Request, Response } from "express";
import pdf2html from 'pdf2html';
import fs from 'fs'
import Pdftohtml from 'pdftohtmljs';
import pdf from 'pdf-parse';

class MainController{
    async pdfToHTML(req: Request, res: Response) {
        try{
            const file: Express.Multer.File = req['file'];
            if(file && file.mimetype === 'application/pdf'){
                const path = `./storage/${file.filename}.html`;
                const converter = new Pdftohtml(file.path, path);
                converter.progress(function(ret) {
                    console.log ((ret.current*100.0)/ret.total + " %");
                });

                await converter.convert('ipad');

                const html = fs.readFileSync(path).toString();
                //const {text} = await  pdf(file.path)
                var pdfUtil = require('pdf-to-text');
                pdfUtil.pdfToText(file.path, {}, function(err, text) {
                    if (err) res.status(500).json({success: false, message: err});;
                    res.json({success: true, data: {html, text}});
                });
                
            }
            else{
                res.status(400).json({success: false, message: 'Arquivo é requirido'});
            }
        }catch(e){
            res.status(500).json({success: false, message: e.message});
        }
    }
}

export default new MainController();