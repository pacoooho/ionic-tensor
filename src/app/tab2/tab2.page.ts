import { Component, OnInit } from '@angular/core';
 
import { CameraPreview,  CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
// import * as tf from '@tensorflow/tfjs';

import * as facemesk  from '@tensorflow-models/facemesh';
//  import '@tensorflow/tfjs-backend-wasm';
 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
interval:any;

pensando: boolean=false;
   picture : string;
 modelo: any;
  constructor(
    private cameraPreview: CameraPreview,
    
     ) {
      

  }
async ngOnInit(){
  this.modelo = await facemesk.load();
console.log(this.modelo);

  // await tf.setBackend('wasm');

  // this.modelo = await facemesk.load().then(res=>{console.log(res);});
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
 
  if (!this.pensando){
    this.cameraPreview.takePicture({width:640, height:400,quality:70}).then(imageData=>{
      // console.log(imageData);
      this.picture = 'data:image/jpeg;base64,' + imageData;
      
  setTimeout(async () => {
    this.pensando=true;
    const img = <HTMLImageElement>document.getElementById('image');
    console.log(img.width);
    //const model = await facemesk.load();
       const predictions =  await this.modelo.estimateFaces(img);
       this.pensando=false;
  
   
      console.log(predictions);
  
  }, 1);
  
      // console.log(this.picture);
    });
  }

}



click2(){
 
     this.interval = setInterval(() => {
   this.click1();
 }, 100);

}



click3(){
clearInterval(this.interval);
// this.cameraPreview.stopCamera();
}

ngOnDestroy()
{
this.cameraPreview.stopCamera();

}
}