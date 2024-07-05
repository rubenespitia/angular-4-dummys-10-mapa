import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  selector: 'app-full-screen-page', // Add this line to specify the selector
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'] // Corrected "styleUrl" to "styleUrls"
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;



  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento HTML no fue encontrado';
    // Ensure this code runs only in the browser
    if (typeof document !== 'undefined') {
      const map = new Map({
        container: this.divMap?.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    }
  }
}
