import { IEntityEdit } from 'Typing/Interfaces/EntityEditModal/IEntityEdit'
import { IEntityView } from './EntitiesManagementView'

export interface IBaseEntityAdapter<TEntity> {
  DefaultEntity : TEntity

  AdaptEntityToManagementView(entity : TEntity) : IEntityView

  AdaptEntityToEditView<TValue, TCustomFields>(entity : TEntity) : IEntityEdit<TValue, TCustomFields>
}
