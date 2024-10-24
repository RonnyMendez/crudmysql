import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: ProductoModel[] = [];

  constructor(
    private productosService: ProductosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.ObtenerTodos().subscribe(response => {
      this.productos = response;
    });
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.cargarProductos();
      }
    });

    return await modal.present();
  }

  // Método para eliminar un producto
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.Eliminar(id).subscribe(() => {
        console.log(`Producto con ID ${id} eliminado`);
        this.cargarProductos();  // Recargar los productos después de la eliminación
      }, (error) => {
        console.error('Error al eliminar producto:', error);
      });
    }
  }

  // Método para abrir el modal en modo de edición de producto
  async editarProducto(producto: ProductoModel) {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
      componentProps: { producto }  // Pasamos el producto a editar
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.cargarProductos();  // Recargar la lista de productos después de la edición
      }
    });

    return await modal.present();
  }
}
