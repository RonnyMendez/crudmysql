import { CategoriaModel } from './categoria.model';

export interface ProductoModel {
  idproducto: number;
  descripcion: string;
  idcategoria: number;
  precio: number;
  cantidad: number;
  estado: number;
  categoria?: CategoriaModel;
}
