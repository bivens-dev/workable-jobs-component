import { StatusRenderer, Task } from '@lit-labs/task';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { WorkableApiResponse, WorkableJobData } from './types.js';

export class WorkableController implements ReactiveController {
  private host: ReactiveControllerHost;

  private _workableAccountId: string;

  private _fetchDataTask!: Task<[string], Array<WorkableJobData>>;

  constructor(host: ReactiveControllerHost, workableAccountId: string) {
    this.host = host;
    this._workableAccountId = workableAccountId;
    host.addController(this);
  }

  hostConnected() {
    this._fetchDataTask = new Task<[string], Array<WorkableJobData>>(
      this.host,
      this.fetchJobsData,
      () => [this._workableAccountId]
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchJobsData(accountId: [string]) {
    try {
      const response = await fetch(
        `https://apply.workable.com/api/v1/widget/accounts/${accountId}?origin=embed`,
        {
          method: 'GET',
        }
      );

      const jobsData: WorkableApiResponse = await response.json();
      return jobsData.jobs;
    } catch (error) {
      throw new Error('Unable to fetch data from Workable');
    }
  }

  render(renderFunctions: StatusRenderer<Array<WorkableJobData>>) {
    return this._fetchDataTask.render(renderFunctions);
  }
}
