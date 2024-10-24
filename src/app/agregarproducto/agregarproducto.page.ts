import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';  // Importamos NavParams para recibir datos
import { ProductosService } from '../services/productos.service';
import { CategoriasService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';  // Importamos el modelo del producto

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  registrarForm: FormGroup;
  categorias: any[] = [];
  isEdit = false;  // Determina si se está en modo edición
  producto: ProductoModel | null = null;  // Producto que se va a editar

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private navParams: NavParams  // Para recibir los parámetros
  ) {
    this.registrarForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      idcategoria: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      estado: [1, [Validators.required]]
    });
  }

  ngOnInit() {
    // Cargar categorías
    this.categoriasService.ObtenerTodas().subscribe(categorias => {
      this.categorias = categorias;
    });

    // Verificar si estamos editando un producto
    this.producto = this.navParams.get('producto');  // Obtener el producto de los parámetros
    if (this.producto) {
      this.isEdit = true;
      this.registrarForm.patchValue(this.producto);  // Rellenar el formulario con los datos del producto a editar
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.registrarForm.valid) {
      if (this.isEdit) {
        // Modo edición: Actualizar producto existente
        this.productosService.Actualizar(this.producto?.idproducto!, this.registrarForm.value).subscribe(
          () => {
            this.modalCtrl.dismiss(true);  // Cierra el modal después de actualizar el producto
          },
          (error) => {
            console.error('Error al actualizar producto:', error);  // Manejo de errores
          }
        );
      } else {
        // Modo creación: Agregar nuevo producto
        this.productosService.Agregar(this.registrarForm.value).subscribe(
          () => {
            this.modalCtrl.dismiss(true);  // Cierra el modal después de agregar el producto
          },
          (error) => {
            console.error('Error al agregar producto:', error);  // Manejo de errores
          }
        );
      }
    }
  }
}
