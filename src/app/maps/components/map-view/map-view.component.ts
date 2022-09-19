import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [
    `
      .map-container {
        position: fixed;
        top: 0;
        right: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  constructor(private _placesService: PlacesService) {}

  ngAfterViewInit(): void {
    if (!this._placesService.useLocation)
      throw Error('No hay placesService.userLocation');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this._placesService.useLocation, // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    const popup = new Popup().setHTML(`
      <h6>Acá estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new Marker({ color: 'red' })
      .setLngLat(this._placesService.useLocation)
      .setPopup(popup)
      .addTo(map);
  }
}
