import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsData {
    // Datos de ejemplo para productos
    private products: Product[] = [
        {
            id: 1,
            name: 'Moto Edge 60 pro',
            description: 'Elegante diseño curvo. Cuatro cámaras profesionales. Crea contenido sin esfuerzo con moto ai y destaca a tu manera.',
            price: 100,
            imageUrl: 'https://images.pexels.com/photos/6956401/pexels-photo-6956401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Celular',
            available: true
        },
        {
            id: 2,
            name: 'ASUS Vivobook',
            description: 'Diseñado con colores que combinan con su ambiente, la serie Vivobook atrevida y juvenil te permite mostrar quién eres realmente.',
            price: 300,
            imageUrl: 'https://images.pexels.com/photos/8532768/pexels-photo-8532768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Laptop',
            available: false
        },
        {
            id: 3,
            name: 'Pantalla Samsung',
            description: 'Sumérgete en el mundo gaming con el Monitor SAMSUNG Odyssey G3.',
            price: 200,
            imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Televisor',
            available: true
        }
    ];

    // Metodo para obtener la lista de productos
    getProducts = () => this.products;
}