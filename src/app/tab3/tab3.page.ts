import { Component } from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-cpu';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
const segmentation = await net.segmentPerson(this.img);
 
const maskBackground = true;
// Convert the segmentation into a mask to darken the background.
const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
const backgroundDarkeningMask = bodyPix.toMask(
    segmentation, foregroundColor, backgroundColor);
 
const opacity = 0.7;
const maskBlurAmount = 3;
const flipHorizontal = false;

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
// Draw the mask image on top of the original image onto a canvas.
// The colored part image will be drawn semi-transparent, with an opacity of
// 0.7, allowing for the original image to be visible under.
bodyPix.drawMask(
   canvas, this.img, backgroundDarkeningMask, opacity, maskBlurAmount,
   flipHorizontal);
}


}
