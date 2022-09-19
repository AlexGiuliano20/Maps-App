import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

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

  constructor(private _http: HttpClient) {
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
    //todo: evaluar cuando el query es nulo
    this.isLoadingPlaces = true;

    this._http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-73.9010722925683%2C40.74411389852324&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiZHJ1LWN1cnJ5IiwiYSI6ImNsODkwcDhtejAyOWk0MXFlOHI2NTFwbXEifQ.MgeucxkQx4ZFfDsyj_F2ng`
      )
      .subscribe((res) => {
        console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
