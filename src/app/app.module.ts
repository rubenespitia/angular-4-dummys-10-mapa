import * as core from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1Ijoid2FudGVkZ3VsbDIiLCJhIjoiY2x5OTJtNHBoMG1qejJscHExZnAzNWs4YyJ9.40vNYyMl-JNsGvdjTOSeFQ';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { CounterAloneComponent } from './alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from "./alone/components/side-menu/side-menu.component";

@core.NgModule({
    declarations: [
        AppComponent,
        MiniMapComponent,
        MapsLayoutComponent,
        FullScreenPageComponent,
        MarkersPageComponent,
        PropertiesPageComponent,
        ZoomRangePageComponent
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CounterAloneComponent,
        SideMenuComponent
    ]
})
export class AppModule { }
