import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

// Importaciones necesarias para el componente ProductListComponent
const importList = [
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  NgOptimizedImage,
  RouterLink,
  MatDialogModule,
  CurrencyPipe
];

@Component({
  selector: 'app-product-list',
  imports: [importList],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  #productService = inject(ProductService);
  readonly dialog = inject(MatDialog);

  protected products = computed(() => this.#productService.productList());

  displayedColumns: string[] = ['imageUrl', 'id', 'name', 'description', 'price', 'category', 'available', 'actions'];
  dataSource = new MatTableDataSource(this.products());

  // Manejo de filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Dialogo que confirma la eliminación de un producto
  // Abre un diálogo de confirmación antes de eliminar un producto
  deleteDialog(productId: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteProduct(productId);
    });
  }

  // Elimina un producto utilizando el servicio ProductService
  deleteProduct(productId: number) {
    this.#productService.delete(productId).subscribe({
      next: (data) => {
        alert('Producto eliminado correctamente');
        this.dataSource.data = this.products();
      },
      error: (err) => {
        alert('Algo salió mal al eliminar el producto');
      }
    });
  }

}