import { TreeNode } from "primeng/api";


export interface Service  {
  id?: number;    // Provided by PanacheEntity
  code: number;
  name: string;
  description: string;
  parent?: Service; // Optional reference to a parent service
  parentId: number; // Mandatory reference to a parent service ID
}