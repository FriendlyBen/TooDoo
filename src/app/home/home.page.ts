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

  addUser(){
    const newUser: User = {Name:"Jordan"};
    return this.userService.addUser(newUser);
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
