import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Task } from '@lit-labs/task';
import { WorkableJobData } from './types.js';

async function fetchPublicJobsByAccount(accountId: [string]): Promise<[WorkableJobData]> {
  const response = await fetch(`https://apply.workable.com/api/v1/widget/accounts/${accountId}?origin=embed`, {
    method: "GET"
  });

  const parsedResponse = await response.json();
  return parsedResponse.jobs;
}

@customElement('workable-widget')
export class WorkableJobsWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--ea-jobs-text-color, #000);
    }
  `;

  @property({ type: String })
  account!: string;

  private _fetchJobsTask = new Task<[string], [WorkableJobData]>(this, fetchPublicJobsByAccount, () => [this.account]);

  // eslint-disable-next-line class-methods-use-this
  private _renderJob(job: WorkableJobData){
    return html`
    <h3>${job.title}</h3>
    <p>${job.education}</p>
    `;
  }

  render() {
    return html`
    <h1>Current Job Openings</h1>
      ${this._fetchJobsTask.render({
        complete: (jobs: [WorkableJobData]) => html`
          <ul>
            ${jobs.map((job) => html`<li>${this._renderJob(job)}</li>`)}
          </ul>
        `,
        pending: () => html`<p>Loading...</p>`,
        error: (e: any) => html`<p>${e}</p>`
      })}
    `
  }
}
