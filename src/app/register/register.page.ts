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


  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  register(){
    const newUser: User = {
      Name: this.name,
      Age: this.age,
      PhoneNumber: this.contactNo,
      Salary: this.salary,
      Weight: this.weight
    };
    this.userService.addUser(newUser);
  }

}
