import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
    `
      .search-container {
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        left: 20px;
        padding: 5px;
        position: fixed;
        top: 20px;
        width: 270px;
      }
    `,
  ],
})
export class SearchBarComponent {
  private _debounceTimer?: NodeJS.Timeout;
  constructor(private _placesService: PlacesService) {}

  onQueryChanged(query: string = '') {
    if (this._debounceTimer) clearTimeout(this._debounceTimer);

    this._debounceTimer = setTimeout(() => {
      this._placesService.placesByQuery(query);
    }, 350);
  }
}
