import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interface';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styles: [
    `
      .pointer {
        cursor: pointer;
      }

      p {
        font-size: 12px;
      }
    `,
  ],
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(
    private _placesService: PlacesService,
    private _mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this._placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this._mapService.flyTo([lng, lat]);
  }

  directions(place: Feature) {
    if (!this._placesService.useLocation) throw Error('No hay userLocation');

    this._placesService.deletePlaces();
    
    const start = this._placesService.useLocation!;
    const end = place.center as [number, number];

    this._mapService.routeBetweenPoints(start, end);
  }
}
