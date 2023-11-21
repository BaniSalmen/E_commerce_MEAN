import { Location } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category } from 'projects/products/src/public-api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted : boolean=false;
  currentCategoryId: string;
  editmode =false;
  


  category:Category = {
    _id:"",
    name:"",
    icon:"",
    color:"" 
  };
  constructor(private formbuilder : FormBuilder,
    private categoriesService: CategoriesService,
    private messageService:MessageService,
    private location : Location,
    private route :ActivatedRoute){}

    
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name:['',Validators.required],
      icon :['',Validators.required],
      color: ['#fff']

    }); 
    this._checkEditMode();
  }
 
  onsubmit(){
    this.isSubmitted=true;

    if(this.form.invalid){
      return;
    }
      this.category._id=this.currentCategoryId;
      this.category.name= this.categoryForm['name'].value;
      this.category.icon= this.categoryForm['icon'].value;
      this.category.color= this.categoryForm['color'].value; 
      console.log(this.category);

      if(this.editmode){
        this._updateCategory(this.category);
      }else{
        this._addCategory(this.category);
      };
    } 
    
   
    get categoryForm() {
      return this.form.controls;
    }

    onCancle() {
      this.location.back();
    }
  

    private _checkEditMode() {
      this.route.params.subscribe((params) => {
        if (params['_id']) {
          this.editmode=true;
          this.currentCategoryId= params['_id'];
          this.categoriesService.getCategory(params['_id']).subscribe(category=>{
              this.categoryForm['name'].setValue(category.name);
              this.categoryForm['icon'].setValue(category.icon);
              this.categoryForm['color'].setValue(category.color);
          })

        }
      });
    }


    private _addCategory(category: Category) {
      this.categoriesService.CreateCategorie(this.category).subscribe(Response=>{
        this.messageService.add
        ({severity:'success',
        summary:'Success',
        detail:'category is created!'});
        timer(2000)
            .toPromise() 
            .then((done) => {
              this.location.back();
            });
      },
      (error)=>{
        this.messageService.add({
          severity:'error',
          summary:'error',
          detail:'category is not created!'
        });
      });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(this.category).subscribe(
      Response=>{
      this.messageService.add
      ({severity:'success',
      summary:'Success',
      detail:'category is updatet!'});
      timer(2000)
          .toPromise() 
          .then((done) => {
            this.location.back();
          });
    },
    (error)=>{
      this.messageService.add({
        severity:'error',
        summary:'error',
        detail:'category is not updated!'
      });
    });
}
}
