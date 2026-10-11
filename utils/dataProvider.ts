import fs from 'fs'
import {parse} from 'csv-parse/sync'

export class DataProvider{

    static getTestDataFromJsonFile(filePath: string): any {
        const data = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(data)
    }

    static getTestDataFromCsvFile(filePath: string): any {
        const data = parse(fs.readFileSync(filePath),{
            columns: true,
            skip_empty_lines: true
        })
        return data
    }
}