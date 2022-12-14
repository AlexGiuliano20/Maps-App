import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private _placesApi: PlacesApiClient,
    private _mapService: MapService
  ) {
    this.userLocation();
  }

  public async userLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.latitude, coords.longitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  placesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.useLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;

    this._placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;

        this._mapService.createMarkersFromPlaces(
          this.places,
          this.useLocation!
        );
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
