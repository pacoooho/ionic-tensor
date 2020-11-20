import { Component, OnInit } from '@angular/core';
 
import { CameraPreview,  CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
interval:any;


   picture : string;
 
  constructor(
    private cameraPreview: CameraPreview,
     ) {

  }
ngOnInit(){
  this.init();
 }
init(){
  const cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: 640,
    height: 400,
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
 this.init();
  this.cameraPreview.takePicture({width:640, height:400,quality:70}).then(imageData=>{
    // console.log(imageData);
    this.picture = 'data:image/jpeg;base64,' + imageData;
  
setTimeout(() => {
  const img = <HTMLImageElement>document.getElementById('image');
  console.log(img.width);
}, 1);

    console.log(this.picture);
  });

}



click2(){
     this.interval = setInterval(() => {
   this.click1();
 }, 10);

}



click3(){
clearInterval(this.interval)
}

ngOnDestroy()
{
this.cameraPreview.stopCamera();

}
}