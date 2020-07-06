import { FieldItemType as Type } from './FieldItemType'
export class FieldItem {
    constructor(public type: Type) {
        this.type = type
    }
}