import { Component, OnInit } from '@angular/core';
import {Tensor} from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-cpu';
 @Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
img: HTMLImageElement;
  
   constructor() {

     

   }
  ngOnInit(){
    this.img = <HTMLImageElement>document.getElementById('image');
console.log(this.img.width);
}

async click(){

  //https://towardsdatascience.com/virtual-background-in-webcam-with-body-segmentation-technique-fc8106ca3038
const net = await bodyPix.load();
const segmentation = await net.segmentPerson(this.img,{
  flipHorizontal: true,
  internalResolution: 'medium',
  segmentationThreshold: 0.5});
 console.log(segmentation);
// The mask image is an binary mask image with a 1 where there is a person and
// a 0 where there is not.
const coloredPartImage = bodyPix.toMask(segmentation);
const opacity = 0.7;
const flipHorizontal = false;
 const maskBlurAmount = 0;
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
// Draw the mask image on top of the original image onto a canvas.
// The colored part image will be drawn semi-transparent, with an opacity of
// 0.7, allowing for the original image to be visible under.
bodyPix.drawMask(
    canvas, this.img, coloredPartImage, opacity, maskBlurAmount,
    flipHorizontal);
}


}
