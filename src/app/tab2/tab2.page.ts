import { Component, OnInit } from '@angular/core';

import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import * as tf from '@tensorflow/tfjs';
import { AnnotatedPrediction } from '@tensorflow-models/facemesh';

import * as facemesk from '@tensorflow-models/facemesh';
import { Coords3D } from '@tensorflow-models/facemesh/dist/util';
//  import '@tensorflow/tfjs-backend-wasm';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  interval: any;

  pensando: boolean = false;
  picture: string;
  modelo: any;

  img: HTMLImageElement;

  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  imagenWidth: number;
  imagenHeight: number;
ctx: any;

  // keypoints: Coords3D[] | tf.Tensor2D []

  constructor(
    private cameraPreview: CameraPreview,

  ) {
 //this.init();

    // this.canvas = <HTMLCanvasElement>document.getElementById('output');
    // this.canvas.width = this.videoWidth;
    // this.canvas.height = this.videoHeight;

  }
  async ngOnInit() {
    this.modelo = await facemesk.load();
    console.log(this.modelo);
    await this.init();
  // await this.cameraPreview.switchCamera();




    // await tf.setBackend('wasm');

    // this.modelo = await facemesk.load().then(res=>{console.log(res);});
  }
 
  async init() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 85,
      y: 450,
      width: 150,
      height: 200,
      // camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha:1,
      
    }

    // start camera
   await this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)

      },
      (err) => {
        console.log(err)
      });
  }


  click1() {

    if (!this.pensando) {
      this.cameraPreview.takePicture({ width: 320, height: 200, quality: 70 }).then(imageData => {
        // console.log(imageData);
        this.picture = 'data:image/jpeg;base64,' + imageData;

        setTimeout(async () => {
          this.pensando = true;
          this.img = <HTMLImageElement>document.getElementById('image2');
          console.log(this.img.width);
          //const model = await facemesk.load();
          const predictions: AnnotatedPrediction[] = await this.modelo.estimateFaces(this.img);
          this.pensando = false;

          this.imagenWidth = this.img.width;
          this.imagenHeight = this.img.height;

          this.canvas = <HTMLCanvasElement>document.getElementById('output');
          this.canvas.width = this.imagenWidth;
          this.canvas.height = this.imagenHeight;
          const canvasContainer = <any>document.querySelector('.canvas-wrapper');
          canvasContainer.style = `width: ${this.imagenWidth}px; height: ${this.imagenHeight}px`;

          this.ctx = this.canvas.getContext('2d');
          this.ctx.translate(this.canvas.width, 0);
          this.ctx.scale(-1, 1);
          this.ctx.fillStyle = '#32EEDB';
          this.ctx.strokeStyle = '#32EEDB';
          this.ctx.lineWidth = 0.5;

          this.ctx.drawImage(
            this.img, 0, 0, this.imagenWidth, this.imagenHeight, 0, 0, this.canvas.width, this.canvas.height);

            if (predictions.length > 0) {
              predictions.forEach(prediction   => {
                const keypoints: Coords3D | tf.Tensor2D = prediction.scaledMesh;
          //console.log("keypoints",keypoints);
              for( let i in keypoints){
                    const x = keypoints[i][0];
                    const y = keypoints[i][1];
          
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
                    this.ctx.fill();
              }
                   
                 
              });
            }
            console.log(predictions);
          console.log(predictions.length);

        }, 1);

        // console.log(this.picture);
      });
    }

  }



  click2() {

    this.interval = setInterval(() => {
      this.click1();
    }, 100);

  }



  click3() {
    clearInterval(this.interval);
    // this.cameraPreview.stopCamera();
  }

  ngOnDestroy() {
    this.cameraPreview.stopCamera();

  }
}