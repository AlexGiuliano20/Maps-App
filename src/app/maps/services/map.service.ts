import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private _map?: Map;
  private _markers: Marker[] = [];

  get isMapReady() {
    return !!this._map;
  }

  setMap(map: Map) {
    this._map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');

    this._map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this._map) throw Error('Mapa no inicializado');

    this._markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `
      );
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this._map);

      newMarkers.push(newMarker);
    }
    this._markers = newMarkers;
  }
}
