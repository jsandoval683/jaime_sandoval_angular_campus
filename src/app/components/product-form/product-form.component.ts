import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Product } from '../../interfaces/product';

const importList = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
];

@Component({
  selector: 'app-product-form',
  imports: [importList],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  productInfo = input<Product>();
  onSubmitOutput = output();
  goBackOutput = output();

  productForm: FormGroup = inject(FormBuilder).group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.min(0)]],
    imageUrl: ['', [Validators.pattern('https?://.+')]],
    category: ['', [Validators.required]],
    available: [true, [Validators.required]]
  });

  // Inicializa el formulario con los valores del producto si se proporciona
  ngOnInit(): void {
    if (this.productInfo()) {
      let value: Product = this.productInfo()!;
      this.productForm.setValue(value);
    }
  }

  // Método para manejar el envío del formulario
  onSubmit = () => this.onSubmitOutput.emit(this.productForm.value);

  // Método para manejar el evento de volver atrás
  goBack = () => this.goBackOutput.emit();

}