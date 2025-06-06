import { Routes } from '@angular/router';

// Rutas de la aplicación
// Define las rutas de la aplicación, cargando componentes específicos para cada ruta de forma perezosa.
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
    },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('./pages/product-edit/product-edit.component').then(m => m.ProductEditComponent)
    },
    {
        path: 'create-product',
        loadComponent: () => import('./pages/product-create/product-create.component').then(m => m.ProductCreateComponent)
    },
    {
        path: '**', redirectTo: '/', pathMatch: "full"
    }
];