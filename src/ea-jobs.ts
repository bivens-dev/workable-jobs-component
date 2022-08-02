import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WorkableJobData } from './types.js';
import { WorkableController } from './workable-controller.js';


@customElement('workable-widget')
export class WorkableJobsWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--workable-widget-font-color, #000);
      font-family: var(--workable-widget-font, sans-serif);
      font-size: clamp(16px, 1rem, 22px);
    }

    li {
      list-style: none;
    }

    .job-category {
      font-weight: 400;
      font-size: 0.8rem;
    }

    .job {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .job-title {
      color: var(--workable-widget-link-color, red);
      text-decoration: none;
      line-height: 1.9em;
      font-weight: bold;
    }

    .job-title:hover {
      color: var(--workable-widget-link-color-hover, red);
    }

    .jobs-list {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--workable-widget-link-color-hover, green);
      padding-left: 0;
    }

    .job-location {
      font-size: 0.8rem;
    }

    .widget-heading {
      font-family: var(--workable-widget-font-header, serif);
      color: var(--workable-widget-headline-color);
    }

    /* Tablet and Larger Overrides */
    @media (min-width: 600px) {
      .job {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .jobs-list {
        padding-left: inherit;
      }
    }


  `;

  @property({ type: String })
  account!: string;

  private jobs?: WorkableController;

  connectedCallback(){
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.jobs = new WorkableController(this, this.account)
  }

  // eslint-disable-next-line class-methods-use-this
  private _renderSingleJob(job: WorkableJobData){
    return html`
      <div class="job">
        <a href="${job.url}" target="_blank" class="job-title">${job.title}</a>
        <span class="job-location">${job.city} ${job.country}</span>
      </div>
    `;
  }

  private _renderJobs(jobs: Array<WorkableJobData>) {
    const groupedJobs = WorkableJobsWidget._groupJobsByIndustry(jobs);

    const sectionCode: Array<TemplateResult<1>> = [];
    
    for (const category of groupedJobs) {
      const categoryName = category[0];
      const categoryJobs = category[1];

      sectionCode.push(html`
      <li class="job-category">${categoryName}</li>
      <ul class="jobs-list">
        ${categoryJobs.map((job) => html`<li>${this._renderSingleJob(job)}</li>`)}
      </ul>
      `);
    }

    return sectionCode;
  }

  // eslint-disable-next-line class-methods-use-this
  private _renderLoadingState(){
    return html`
      <p>Loading...</p>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  private _renderErrorState(error: any){
    // eslint-disable-next-line no-console
    console.error(error);
    return html`
      <p>${error}</p>
    `;
  }

  render() {
    if (this.jobs !== undefined) {
      return html`
        <h3 class="widget-heading">Current Job Openings</h3>
          ${this.jobs.render({
            complete: (jobsData: Array<WorkableJobData>) => this._renderJobs(jobsData),
            pending: () => this._renderLoadingState(),
            error: (e: any) => this._renderErrorState(e)
          })}
        `;
    }
    
    return html``;
  }

  // Takes an Array<WorkableJobData> and returns a Map<string, Array<WorkableJobData>> which groups
  // the various job listings by their industry which is the key
  private static _groupJobsByIndustry(jobs: Array<WorkableJobData>){
    const groupedMap = jobs.reduce(
      (entryMap, e) => entryMap.set(e.industry, [...entryMap.get(e.industry)||[], e]),
      new Map<string, Array<WorkableJobData>>()
    );

    return groupedMap;
  }
}
