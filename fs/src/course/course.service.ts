import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as Exceljs from 'exceljs';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName, CourseDocument } from './entities/course.entity';
@Injectable()
export class CourseService {
  constructor(@InjectModel(TableName) private readonly course: Model<CourseDocument>) {

  }
  async handlerExcel(file: Express.Multer.File) {
    if (!file) return '请上传文件'
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0];
    const rows = []
    worksheet.eachRow((row) => {
      const rowData = []
      row.eachCell((cell) => {
        rowData.push(cell.value)
      })
      rows.push(rowData)
    })
    const columns = rows[1]
    rows.shift() //删除中文
    rows.shift() //删除key
    //剩下的就是值了 key-value映射
    const data = []
    const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]'
    rows.forEach((item) => {
      const obj = {}
      item.forEach((value, index) => {
        obj[columns[index]] = isObject(value) ? Number(value.result ? value.result : 0) : value
      })
      data.push(obj)
    })
    try {
      await this.course.insertMany(data)
      return '导入成功';
    }
    catch (e) {
      console.log(e)
      return '导入失败' + e
    }
  }
}
