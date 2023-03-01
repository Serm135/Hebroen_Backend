const express = require('express');
const router = express.Router();
const fs = require('fs');
const Excel = require('exceljs');
var _ = require('underscore');


router.post('/', async(req,res)=>{
  const workbook = new Excel.Workbook();
  const path = 'files/informe.xlsx';
  const excel = fs.realpathSync(path,{encoding:'utf8'});
  const data = req.body;
  if (data!='') {
    try {
      workbook.xlsx.readFile(excel)
      .then(function() {
          const worksheet = workbook.getWorksheet(1);
          worksheet.getCell('F1').value = data.code; //Código
          worksheet.getCell('B6').value = data.client; //Cliente
          worksheet.getCell('F6').value = data.date; //Fecha visita
          worksheet.getCell('B8').value = data.siteName; //Nombre del sitio
          worksheet.getCell('F8').value = data.address1; //Dirección
          worksheet.getCell('B10').value = data.description; //Descripción breve de la obra
          worksheet.getCell('F10').value = data.address2; //Dirección 2
          worksheet.getCell('A15').value = data.relevantComments; //Comentarios Relevantes de la visitade obra
          //IF para la cantidad de tipo de trabajos que sean necesarios + añadir más columnas si es necesario
          const sw = data.scopesWork;
          var index = 19;
          const len = sw.length-6;
          if (sw.length>6) {
            duplicateRowWithMergedCells(worksheet,19,len);
            const col = worksheet.getRow(38+len);
            col.height=62;
          }
          sw.map(item=>{
            worksheet.getCell(`A${index}`).value = item.typeWork;
            worksheet.getCell(`B${index}`).value = item.description;
            index++;
          })
          //Fotos desarrollo del trabajo
          const imageId1 = workbook.addImage({
            filename: 'files/foto1.jpeg',
            extension: 'jpeg',
          });
          worksheet.addImage(imageId1, {
            tl: { col: 0, row: 27.2+len },
            ext: { width: 260, height: 230 }
          });
          worksheet.addImage(imageId1, {
            tl: { col: 2.5, row: 27.2+len },
            ext: { width: 350, height: 230 }
          });
          worksheet.addImage(imageId1, {
            tl: { col: 3.5, row: 27.2+len },
            ext: { width: 350, height: 230 }
          });
          //Fin fotos
          worksheet.getCell(`C${38+len}`).value = 'Juan Carlos'; //Nombre de quien visitó y elabora el informe
          const imageId2 = workbook.addImage({
            filename: 'files/firma.jpg',
            extension: 'jpg',
          });
          worksheet.addImage(imageId2, {
            tl: { col: 4.7, row: 37.3+len },
            ext: { width: 230, height: 73 }
          });
          res.status(202).json('Ok')
          return workbook.xlsx.writeFile('files/new.xlsx');
      });
    } catch (error) {
      res.status(404).json('Not Ok')
      console.log(error);
    }
  } else {
    res.status(500).json({message:'No Content'})
  }
});

const duplicateRowWithMergedCells = (sheet, row, count) => {
  sheet.duplicateRow(row, count, true);

  const merges = sheet.model.merges;
  // Find all merges inside initial row
  const rowMerges = merges.filter(range => range.match(`\\w+${row}:\\w+${row}`));

  _.times(count, index => {
    const newRow = row + index + 1;

    // Unmerge everything in a newRow so we dont run into conflicts
    merges
      .filter(range => range.match(`\\w+${newRow}:\\w+${newRow}`))
      .forEach(range => sheet.unMergeCells(range));

    // Merge the same cells as in the initial row
    rowMerges
      .map(range => range.replace(new RegExp(`${row}`, 'g'), `${newRow}`))
      .forEach(range => sheet.mergeCells(range));
  });
};

module.exports = router;
