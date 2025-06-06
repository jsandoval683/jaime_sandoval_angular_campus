import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsData } from './data';
import { Observable, of } from 'rxjs';

const STORAGE_KEY = 'products_data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #data = inject(ProductsData);

  productList = signal<Product[]>([]);

  // Constructor que inicializa la lista de productos desde el almacenamiento local o desde los datos por defecto
  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.productList.set(stored ? JSON.parse(stored) : this.#data.getProducts());
    this.saveToStorage();
  }

  // Método para guardar la lista de productos en el almacenamiento local
  saveToStorage = (): void => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productList()));

  // Método que obtiene todos los productos
  getAll(): Observable<Product[]> {
    return of([...this.productList()]);
  }

  // Método que obtiene un producto por su ID
  getById(id: number): Observable<Product | undefined> {
    const product = this.productList().find(p => p.id === id);
    return of(product);
  }

  // Método que crea un nuevo producto
  create(product: Product): Observable<Product> {
    const newId = this.productList().length > 0 ? Math.max(...this.productList().map(p => p.id!)) + 1 : 1;
    const newProduct: Product = { ...product, id: newId };
    this.productList.update(x => [...x, newProduct]);
    this.saveToStorage();
    return of(newProduct);
  }

  // Métodos para actualizar productos
  update(id: number, updated: Product): Observable<Product[]> {
    this.productList.update(x => x.map(y => y.id === id ? updated : y));
    this.saveToStorage();
    return of([...this.productList()]);
  }

  // Método que elimina un producto por su ID
  delete(id: number): Observable<Product[]> {
    this.productList.update(x => x.filter(p => p.id !== id));
    this.saveToStorage();
    return of([...this.productList()]);
  }
  
}