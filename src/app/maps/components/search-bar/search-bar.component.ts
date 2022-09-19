import { Component } from '@angular/core';

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
  constructor() {}

  onQueryChanged(query: string = '') {
    if (this._debounceTimer) clearTimeout(this._debounceTimer);

    this._debounceTimer = setTimeout(() => {
      console.log('Mandar esta query', query);
    }, 350);
  }
}
