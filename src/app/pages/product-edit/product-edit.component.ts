import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductFormComponent } from "../../components/product-form/product-form.component";
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-edit',
  imports: [ProductFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {

  #productService = inject(ProductService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  protected product = signal<Product | undefined>(undefined);

  // Método que se ejecuta al inicializar el componente
  // Obtiene el ID del producto de la ruta y llama al servicio para obtener los detalles del producto
  ngOnInit(): void {
    const productId = Number(this.#activatedRoute.snapshot.paramMap.get('id'));
    this.getProductById(productId);
  }

  // Método que obtiene los detalles del producto utilizando el servicio ProductService
  getProductById(id: number) {
    this.#productService.getById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product.set(product);
        } else {
          alert('Producto no encontrado');
          this.goBack();
        }
      }
    });
  }

  // Método que se ejecuta al enviar el formulario
  // Actualiza el producto utilizando el servicio ProductService
  onSubmit(event: any) {
    this.#productService.update(this.product()?.id!, event).subscribe({
      next: (response) => {
        alert('Producto actualizado exitosamente');
        this.goBack();
      },
      error: (error) => {
        alert('Error actualizando el producto:');
      }
    });
  }

  // Método que se ejecuta al hacer clic en el botón "Volver"
  goBack = () => this.#router.navigate(['/products']);

}