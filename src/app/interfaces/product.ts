// Define la interfaz Product que describe la estructura de un producto en la aplicación.
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    available: boolean;
}