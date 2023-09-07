import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {Camera} from '@awesome-cordova-plugins/camera/ngx/index';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())],
  providers: [Camera, CameraPreview, FormsModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
