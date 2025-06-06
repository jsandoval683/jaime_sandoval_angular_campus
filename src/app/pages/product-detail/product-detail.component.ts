import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, MatButtonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  #productService = inject(ProductService);
  #activatedRoute = inject(ActivatedRoute);

  protected product = signal<Product | undefined>(undefined);

  // Método que se ejecuta al inicializar el componente
  // Obtiene el ID del producto de la ruta y llama al servicio para obtener los detalles del producto
  ngOnInit(): void {
    const productId = Number(this.#activatedRoute.snapshot.paramMap.get('id'));
    this.getProduct(productId);
  }

  // Método que obtiene los detalles del producto utilizando el servicio ProductService
  getProduct(productId: number) {
    this.#productService.getById(productId).subscribe({
      next: (data) => {
        this.product.set(data);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

}