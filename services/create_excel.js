const express = require('express');
const router = express.Router();
const fs = require('fs');
const Excel = require('exceljs');


router.post('/', async(req,res)=>{
  const workbook = new Excel.Workbook();
  const path = 'files/informe.xlsx';
  const excel = fs.realpathSync(path,{encoding:'utf8'});
  try {
    workbook.xlsx.readFile(excel)
    .then(function() {
        const worksheet = workbook.getWorksheet(1);
        worksheet.getCell('B6').value = 'Alberto'; //Cliente
        worksheet.getCell('F6').value = '12/12/1999'; //Fecha visita
        worksheet.getCell('B8').value = 'Malecon'; //Nombre del sitio
        worksheet.getCell('F8').value = 'Calle ...'; //Dirección
        worksheet.getCell('B10').value = 'La obra va joya'; //Descripción breve de la obra
        worksheet.getCell('F10').value = 'Calle ... Carrera'; //Dirección 2
        worksheet.getCell('A15').value = 'Falta cantidad importante de materiales asdkjfa sdlfjals kdjfal;skdjf;lajsd lfajslfdjasldfjaks hdfkahsdfkjahskd hfkasdf asdfasdfasldfjalsdjfljalsj laskdjflaksjdlfkajsldkfj alskdjflasjdlfkjls djflas jlfkj sld jlaskdjfl ajsldfkajsl'; //Comentarios Relevantes de la visitade obra
        //IF para la cantidad de tipo de trabajos que sean necesarios + añadir más columnas si es necesario
        worksheet.getCell('A19').value = 'Transporte de materiales'; //Tipo de trabajos
        worksheet.getCell('B19').value = 'Llevar el cemento'; //Descripción del alcance
        //Fotos desarrollo del trabajo
        const imageId1 = workbook.addImage({
          filename: 'files/foto1.jpeg',
          extension: 'jpeg',
        });
        worksheet.addImage(imageId1, {
          tl: { col: 0, row: 27.2 },
          ext: { width: 260, height: 230 }
        });
        worksheet.addImage(imageId1, {
          tl: { col: 2.5, row: 27.2 },
          ext: { width: 350, height: 230 }
        });
        worksheet.addImage(imageId1, {
          tl: { col: 3.5, row: 27.2 },
          ext: { width: 350, height: 230 }
        });

        worksheet.getCell('C38').value = 'Juan Carlos'; //Nombre de quien visitó y elabora el informe
        const imageId2 = workbook.addImage({
          filename: 'files/firma.jpg',
          extension: 'jpg',
        });
        worksheet.addImage(imageId2, {
          tl: { col: 4.7, row: 37.3 },
          ext: { width: 230, height: 73 }
        });
        res.status(202).json('Ok')
        return workbook.xlsx.writeFile('files/new.xlsx');
    });
  } catch (error) {
    res.status(404).json('Not Ok')
    console.log(error);
  }
});

module.exports = router;
