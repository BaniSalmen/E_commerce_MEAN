import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'projects/users/src/public-api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
  constructor(private authService : AuthService){}
  ngOnInit(): void {}

  logoutUser(){
    this.authService.logout();
  }

}
