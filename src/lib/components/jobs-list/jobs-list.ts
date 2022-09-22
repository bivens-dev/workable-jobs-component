// This component is going to not worry about the filtering itself but is just going to expect a list of
// Jobs of an arbitrary length and it will just worry about how many to show at a time
// It should make the number shown by default configurable as an attribute on the root level

import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { WorkableJobDataV1 } from '../../types/workable-api-types.js';
import { styles } from './jobs-list-styles.js';

import '../job-card/job-card.js';

/**
 * A component that allows users to view and filter a list of available jobs
 *
 * @fires job-location-changed - Fires when the user filters the list by location.
 */
@customElement('jobs-list')
export class JobsList extends LitElement {
  /// The full list of open Job Positions according to the Workable API
  @property({ type: Object })
  openPositions: Array<WorkableJobDataV1> = [];

  @state()
  locationFilter?: string;

  @query('#location-select')
  locationSelectBox!: HTMLSelectElement;

  static styles = [styles];

  override render(): TemplateResult<1> {
    const visibleJobs = this.getVisibleJobs();

    return html`
      <h1>Open Positions</h1>
      ${this.renderLocationDropdown()}
      <ul id="job-listings">
        ${visibleJobs.map(
          position =>
            html`<li><job-card .jobData="${position}"></job-card></li>`
        )}
      </ul>
    `;
  }

  private getAvailableLocations(): Set<string> {
    const countries = this.openPositions.map(position => position.country);
    return new Set(countries);
  }

  // Determine which jobs to show the user based on what filters are currently set
  private getVisibleJobs(): Array<WorkableJobDataV1> {
    let visibleJobs: Array<WorkableJobDataV1>;

    // Filter the results based on the location
    if (this.locationFilter === undefined || this.locationFilter === '') {
      visibleJobs = this.openPositions;
    } else {
      visibleJobs = this.openPositions.filter(
        position => position.country === this.locationFilter
      );
    }

    // Can further filter the list of additional criteria in the future here

    return visibleJobs;
  }

  // Create a select element populated with the locations we have jobs for
  private renderLocationDropdown(): TemplateResult<1> {
    const locations = this.getAvailableLocations();

    return html`
      <label for="location-select">Choose a location:</label>

      <select
        name="locations"
        id="location-select"
        @change="${this._onLocationChange}"
      >
        <option value="">--Please choose an option--</option>
        ${map(
          locations,
          location => html`<option .value=${location}>${location}</option>`
        )}
      </select>
    `;
  }

  // Called whenever the `locationSelectBox` element is changed
  private _onLocationChange(event: Event) {
    // Find out what location was selected and update the filter value
    const locationSelected = this.locationSelectBox.value;
    this.locationFilter = locationSelected;

    // Communicate with parent elements that the location filter has changed
    const options = {
      detail: { locationSelected },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('job-location-changed', options));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jobs-list': JobsList;
  }
}
