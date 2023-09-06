import { Component } from '@angular/core';
import {Camera} from '@awesome-cordova-plugins/camera/ngx/index'
import { UsersService } from '../service/users.service';
import { User } from '../model/user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgURL: any;

  constructor(private camera: Camera,private userService: UsersService, private alertCtrl: AlertController) {

  }

  async addUser(){
    const alert = await this.alertCtrl.create({
      header: "New User",
      inputs:[
        {
          name: "Name",
          placeholder: "I want your name",
          type:'text',
        },
        {
          name: "Age",
          placeholder: "I want your age",
          type:'number',
        },        {
          name: "PhoneNumber",
          placeholder: "I want your contact number",
          type:'text',
        },        {
          name: "Salary",
          placeholder: "I want your salary",
          type:'text',
        },
        {
          name: "Weight",
          placeholder: "I want your weight",
          type:'number',
        },
      ],
      buttons:[
        {
          text:"Cancel",
          role:"cancel"
        },
        {
          text:"Register",
          handler: (data)=>{
            var age: number = parseInt(data.Age,10);
            var weight: number = parseInt(data.Weight,10);
            const newUser: User = {
              Name: `${data.Name}`,
              Age: age,
              PhoneNumber: `${data.PhoneNumber}`,
              Salary: `${data.Salary}`,
              Weight: weight
            };
            this.userService.addUser(newUser);
          }
        }

      ]
    });
    await alert.present();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data) =>{
      console.log(data);
    })
  }

  async getUserByName(){
      const alert = await this.alertCtrl.create({
        header: 'Search User',
        inputs:[
          {name: 'Username',
        placeholder: "I need a name",
      type: "text"}
        ],
        buttons:[
          {text:"Cancel",
        role:'cancel'},
        {
          text:'Search',
          handler: (data) =>{
            this.userService.getUserByName(data.Username);
          }
        }
        ]
      });
      await alert.present();
  }



  getCamera(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((imageData)=>{
      this.imgURL = imageData;
    }).catch(e=>{
      console.log(e);
    })
  }

  getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData)=>{
      this.imgURL = 'data:image/jpeg;base64,' + imageData;
    }).catch(e=>{
      console.log(e);
    })
  }
}
