import { CustomId } from 'Typing/Types'
import { IActionResponse } from './IActionResponse'

export type ICreateEntityAction<TEntity> = (params : {body : TEntity}) => Promise<IActionResponse>

export type IUpdateEntityAction<TEntity> = (params : {id: CustomId, body : TEntity}) => Promise<IActionResponse>

export type IDeleteEntityAction = (id : CustomId) => Promise<IActionResponse>

export type IActivateEntityAction = (id : CustomId) => Promise<IActionResponse>

export type IDeactivateEntityAction = (id : CustomId) => Promise<IActionResponse>

export type IGetAllEntitiesAction<TEntity> = (query? : string) => Promise<Array<TEntity>>

export interface ICrudActions<TEntity> {
  CreateEntity? : ICreateEntityAction<TEntity>
  UpdateEntity? : IUpdateEntityAction<TEntity>
  DeleteEntity? : IDeleteEntityAction
  ActivateEntity? : IActivateEntityAction
  DeactivateEntity? : IDeactivateEntityAction
  GetAllEntities? : IGetAllEntitiesAction<TEntity>
}
