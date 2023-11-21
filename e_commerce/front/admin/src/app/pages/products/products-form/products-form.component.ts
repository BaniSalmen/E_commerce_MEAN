import { Component  ,OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'projects/products/src/lib/services/categories.service';
import { ProductsService } from 'projects/products/src/lib/services/products.service';
import { Category, Product } from 'projects/products/src/public-api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit{

  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories : Category[] ;
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  product:Product = {
  id:"",
  name: "",
  description: "",
  image:"",
  brand: " ",
  price: 0,
  category: {},
  countInStock: 0,
  isFeatured: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  thi
  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['',Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService.getcategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => { 
      if (params['_id']) { 
        this.editmode = true;
        this.currentProductId = params['_id'];
        this.productsService.getProduct(params['_id']).subscribe((product) => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category._id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        });
      }
    });
  }
  get productForm() {
    return this.form.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  
  onCancel() {
    this.location.back();
  }


  /**onsubmit(){
    this.isSubmitted=true;

    if(this.form.invalid){
      return;
    }
      this.product.id=this.currentProductId;
      this.product.name= this.productForm['name'].value;
      this.product.brand= this.productForm['brand'].value;
      this.product.category= this.productForm['category'].value; 
      this.product.price= this.productForm['price'].value;
      this.product.countInStock= this.productForm['countInStock'].value;
      this.product.isFeatured= this.productForm['isFeatured'].value;
      this.product.description= this.productForm['description'].value;
      this.product.richDescription= this.productForm['richDescription'].value;
      this.product.image= this.productForm['image'].value;
    
      console.log(this.product);

      if(this.editmode){
        this._updateProduct(this.product);
      }else{
        this._addProduct(this.product);
      };
    } 
*/




  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product :Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }


  private _updateProduct(productData: FormData) {
    this.productsService.updateProduct(productData, this.currentProductId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not updated!'
        });
      }
    );
  }


  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

} 
