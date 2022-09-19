import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [],
})
export class MapScreenComponent {
  constructor(private _placesService: PlacesService) {}

  get isUserLocationReady() {
    return this._placesService.isUserLocationReady;
  }
}
