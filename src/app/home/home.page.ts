import { Component } from '@angular/core';
import {Camera} from '@awesome-cordova-plugins/camera/ngx/index'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgURL: any;

  constructor(private camera: Camera) {}


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
