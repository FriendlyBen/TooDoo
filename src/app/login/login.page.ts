import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userService: UsersService) { }

  email!: string;
  password!: string;

  ngOnInit() {
  }

  login(){
    this.userService.signin(this.email, this.password)
  }

}
