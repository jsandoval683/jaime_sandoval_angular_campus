import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatSlideToggleModule, MatButtonModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tittle = signal('Gestión de Productos');
  description = signal('Esta aplicación te permite gestionar productos de manera sencilla y eficiente. Puedes crear, editar, eliminar y listar productos fácilmente. ¡Comienza a explorar!');
  productLink = signal('/products');
  #productService = inject(ProductService);

  products = computed(() => this.#productService.productList());

  // Calcula el total de productos
  totalValue = computed(() => this.products().reduce((total, product) => total + product.price, 0));

  // Calcula el total de productos disponibles
  totalAvailable = computed(() => this.products().reduce((total, product) => total + (product.available ? 1 : 0), 0));

}