import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name!: string;
  age!: number;
  contactNo!: string;
  salary!: string;
  weight!: number;

  email!: string;
  password!: string;


  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  register(){
    this.userService.register(this.email, this.password);
  }

}
