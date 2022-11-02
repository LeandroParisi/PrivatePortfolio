import { CustomId } from 'Typing/Types'
import { EditFieldType } from './Enums'

export interface IEntityEdit<TValue, TCustomFields> {
  id : CustomId
  isActive : boolean
  header : IEntityEditHeader
  sections : Array<IEntityEditSection<TValue, TCustomFields>>
}

export interface IEntityEditHeader {
  image : string
  stateKey : string
  fieldType : EditFieldType
}

export interface IEntityEditSection<TValue, TCustomFields> {
  title : string
  subSections : Array<IEntityEditSubSection<TValue, TCustomFields>>
}

export interface IEntityEditSubSection<TValue, TCustomFields> {
  initialValue : TValue
  stateKey : string
  sectionName : string
  fieldType : EditFieldType
  customFieldType : TCustomFields
}
