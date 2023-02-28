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
        var row = worksheet.getRow(6);
        row.getCell(2).value = 'Alberto Mario'; 
        row.commit();
        res.status(202).json('Ok')
        return workbook.xlsx.writeFile('files/new.xlsx');
    });
  } catch (error) {
    res.status(404).json('Not Ok')
    console.log(error);
  }
});

module.exports = router;
