import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { WorkableJobDataV1 } from '../../types/workable-api-types.js';
import { styles } from './job-card-styles.js';

@customElement('job-card')
export class JobCard extends LitElement {
  @property({ type: Object })
  jobData?: WorkableJobDataV1;

  static styles = [styles];

  override render(): TemplateResult<1> {
    if (this.jobData === undefined) {
      return html``;
    }

    return html`
      <div class="job">
        <a href="${this.jobData.url}" target="_blank" class="job-title"
          >${this.jobData.title}</a
        >
        <span class="job-location"
          >${this.jobData.city} ${this.jobData.country}</span
        >
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'job-card': JobCard;
  }
}
