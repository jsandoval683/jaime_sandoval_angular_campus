import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
  selector: 'app-product-create',
  imports: [ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {

  #productService = inject(ProductService);
  #router = inject(Router);

  // Método que se ejecuta al enviar el formulario
  onSubmit(event: any) {
    this.#productService.create(event).subscribe({
      next: (response) => {
        alert('Producto creado exitosamente');
        this.goBack();
      },
      error: (error) => {
        alert('Error creando el producto:');
      }
    });
  }

  // Método que se ejecuta al hacer clic en el botón "Volver"
  goBack = () => this.#router.navigate(['/products']);

}