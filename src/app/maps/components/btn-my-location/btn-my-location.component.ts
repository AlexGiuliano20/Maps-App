import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styles: [
    `
      button {
        position: fixed;
        top: 20px;
        right: 20px;
      }
    `,
  ],
})
export class BtnMyLocationComponent {
  constructor(
    private _placesService: PlacesService,
    private _mapService: MapService
  ) {}

  goToMyLocation() {
    if (!this._placesService.isUserLocationReady)
      throw Error('No hay ubicacion de usuario');
    if (!this._mapService.isMapReady) throw Error('No hay mapa disponible');

    this._mapService.flyTo(this._placesService.useLocation!);
  }
}
