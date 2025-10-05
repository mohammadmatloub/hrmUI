import {Category} from './category.model';

export interface Department {
  id?: number;
  name?: string;
  code?: number;
  category?: Category;
}
