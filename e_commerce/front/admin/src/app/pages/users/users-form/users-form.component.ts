import { Location } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'projects/users/src/lib/models/user';
import { timer } from 'rxjs';
import { UsersService } from 'projects/users/src/lib/services/users.service';

declare const require;
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit{
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId: string;
  countries = [];



  user:User = {
    id: "",
    name: "",
    password: "",
    email:"",
    phone: "",
    token: "",
    isAdmin: true,
    street: "",
    apartment: "",
    zip: "",
    city: "",
    country: "",
  };

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    //this._getCountries();

  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  /* private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en",{select :"official"})).map(
      (entry)=>{
      return {
        id : entry[0],
        name : entry[1]
      }
    });
    console.log(this.countries);
  } */

  

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe( 
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(this.user).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
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
          detail: 'User is not updated!'
        });
      }
    );
  }

  get userForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    
      this.user.id= this.currentUserId,
      this.user.name= this.userForm['name'].value;
      this.user.email= this.userForm['email'].value;
      this.user.phone=this.userForm['phone'].value;
      this.user.isAdmin= this.userForm['isAdmin'].value;
      this.user.street=this.userForm['street'].value;
      this.user.apartment= this.userForm['apartment'].value;
      this.user.zip= this.userForm['zip'].value;
      this.user.city= this.userForm['city'].value;
      this.user.country= this.userForm['country'].value;
    
      
    if (this.editmode) {
      this._updateUser(this.user);
    } else {
      this._addUser(this.user);
    }
  }

  onCancel() {
    this.location.back();
  }

  
}
