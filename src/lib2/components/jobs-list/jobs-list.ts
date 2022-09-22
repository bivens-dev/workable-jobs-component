// This component is going to not worry about the filtering itself but is just going to expect a list of
// Jobs of an arbitrary length and it will just worry about how many to show at a time
// It should make the number shown by default configurable as an attribute on the root level

import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { WorkableJobDataV1 } from '../../types/workable-api-types.js';

@customElement('jobs-list')
export class JobsList extends LitElement {
  /// The full list of open Job Positions according to the Workable API
  @property({ type: Object })
  openPositions: Array<WorkableJobDataV1> = [];

  @state()
  locationFilter?: string;

  @query('#location-select')
  locationSelectBox!: HTMLSelectElement;

  override render() {
    let visibleJobs: Array<WorkableJobDataV1>;

    if (this.locationFilter === undefined || this.locationFilter === 'all') {
      visibleJobs = this.openPositions;
    } else {
      visibleJobs = this.openPositions.filter(
        position => position.country === this.locationFilter
      );
    }

    return html`
      <h1>Open Positions</h1>
      ${this.renderLocationDropdown()}
      <ul>
        ${visibleJobs.map(position => html`<li>${position.title}</li>`)}
      </ul>
    `;
  }

  private getAvailableLocations(): Set<string> {
    const countries = this.openPositions.map(position => position.country);
    return new Set(countries);
  }

  private renderLocationDropdown() {
    const locations = this.getAvailableLocations();

    return html`
      <label for="location-select">Choose a location:</label>

      <select
        name="locations"
        id="location-select"
        @change="${this._onLocationChange}"
      >
        <option .value=${'all'}>--Please choose an option--</option>
        ${map(
          locations,
          location => html`<option .value=${location}>${location}</option>`
        )}
      </select>
    `;
  }

  private _onLocationChange(event: Event) {
    const filterOption = this.locationSelectBox.value;
    this.locationFilter = filterOption;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jobs-list': JobsList;
  }
}
