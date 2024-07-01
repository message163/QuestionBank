export class CreateGradeDto {}


export interface Page {
    pageNo: number
    pageSize: number
}

export interface Query extends Page {
   keyWord:string
}