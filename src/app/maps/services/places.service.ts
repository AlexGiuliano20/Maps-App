import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
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
}
