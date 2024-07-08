import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'app-marker-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'] // Note the correct property name is styleUrls
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.08286160913693, 40.7270055088712);
  public markers: MarkerAndColor[] = [];

  //constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    // Ensure this code runs only in the browser
    //if (isPlatformBrowser(this.platformId)) {
    if (typeof document !== 'undefined') {
      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.currentLngLat, // starting position [lng, lat]
        zoom: this.zoom // starting zoom
      });

      this.readFromLocalStorage();
    }
  }

  createMarker()
  {
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat,color);
  }

  addMarker(lngLat:LngLat, color:string){
    if(!this.map) return;

    const marker= new Marker({
      color:color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({
      color,
      marker
    });
    this.saveToLocalStorage();

    marker.on('dragend',()=> {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index:number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
  }


  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color,marker})=>{
      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
  });
  console.log(plainMarkers);
  localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
}

  readFromLocalStorage(){
    const plainMarkerString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkerString);

    plainMarkers.forEach( ({color,lngLat}) =>{
      const [lng,lat] = lngLat;

      const coords = new LngLat(lng,lat);
      console.log(plainMarkers);
      this.addMarker(coords,color);

    })

  }

}
