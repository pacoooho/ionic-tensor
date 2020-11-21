import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-cpu';
// https://medium.com/angular-in-depth/create-your-own-image-classifier-with-angular-and-tensorflow-js-5b1bc2391424
//https://github.com/tensorflow/tfjs-models/tree/master/facemesh

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = false;

  constructor(
    private cameraPreview: CameraPreview
  ) {
    this.cameraPreview.stopCamera().then((res) => {
      this.isToBack = false;
      console.log("Stop res ", res);

      this.cameraPreview.startCamera({
        x: 80,
        y: 450,
        width: 300,
        height: 250,
        toBack: false,
        previewDrag: true,
        tapPhoto: true
      });
    }).catch(er => {
      console.log("er", er);
    })
  }


  ngOnInit() {
    // this.init();

  }

  init() {
    this.cameraPreview.startCamera({ x: 0, y: 0, width: window.screen.width, height: window.screen.height, camera: "front", tapPhoto: true, previewDrag: false, toBack: true });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  startCameraAbove() {
    console.log("startCameraAbove");

    this.cameraPreview.stopCamera().then((res) => {
      this.isToBack = false;
      console.log("Stop res ", res);

      this.cameraPreview.startCamera({
        x: 80, y: 450, width: 250, height: 300, toBack: false,
        previewDrag: true, tapPhoto: true
      });
    }).catch(er => {
      this.cameraPreview.stopCamera()
      console.log("er", er);
    })
  }

  startCameraBelow() {

    console.log("startCameraBelow");
    this.cameraPreview.stopCamera().then((res) => {
      console.log("Stop res", res);
      this.isToBack = true;
      this.cameraPreview.startCamera({
        x: 0, y: 50, width: 250, height: 300, camera: "front",
        tapPhoto: true, previewDrag: false, toBack: true
      });
    }).catch(er => {
      console.log("er", er);
      this.cameraPreview.stopCamera()
    })
  }


  stopCamera() {
    this.cameraPreview.stopCamera();

  }

  takePicture() {
    this.cameraPreview.takePicture({
      width: 1280,
      height: 1280,
      quality: 85
    }).then((imageData) => {
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.IMAGE_PATH = 'assets/img/test.jpg';
    });
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  show() {
    this.cameraPreview.show();
  }

  hide() {
    this.cameraPreview.hide();
  }

  changeColorEffect() {
    this.cameraPreview.setColorEffect(this.colorEffect);
  }

  changeFlashMode() {
    this.cameraPreview.setFlashMode(this.flashMode);
  }

  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }

  showSupportedPictureSizes() {
    this.cameraPreview.getSupportedPictureSizes().then((sizes) => {
      console.log(sizes);
    }, (err) => {
      console.log(err);
    });
  }


  ngOnDestroy() {
    console.log("destroy");
    this.cameraPreview.stopCamera();
    console.log("stop? ", this.cameraPreview.stopCamera());
  }
}
