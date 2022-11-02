import React from "react";

export type ICustomFieldFactory<T extends ICustomFieldLib> = (fieldType : keyof T) => React.Component

export interface ICustomFieldLib {

} 
