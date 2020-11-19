import { Component, OnInit } from '@angular/core';
 

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
   picture : string;
    cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  }
  constructor(private cameraPreview: CameraPreview) {

  }
ngOnInit(){
  const cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  }
  
  // start camera
  this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      console.log(res)
 
    },
    (err) => {
      console.log(err)
    });
}

click1(){
  this.cameraPreview.takePicture({width:640, height:640,quality:90}).then(imageData=>{
    // console.log(imageData);
    this.picture = 'data:image/jpeg;base64,' + imageData;
    console.log(this.picture);
  });

}
click2(){
  this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    (res) => {
      console.log(res)
 
    },
    (err) => {
      console.log(err)
    });
}
click3(){

}
}