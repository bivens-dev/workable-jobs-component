import { StatusRenderer, Task } from '@lit-labs/task';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { WorkableAccountValidator } from '../../services/workable-account-validator.js';
import {
  WorkableApiResponseV1,
  WorkableJobDataV1,
} from '../../types/workable-api-types.js';

/**
 * A Reactive Controller that manages working with the Workable API V1 to fetch the data
 * @implements ReactiveController
 */
export class WorkableController implements ReactiveController {
  private _host: ReactiveControllerHost;

  // A string representing your Workable Account ID
  private _workableAccountId: string;

  // A `Task` responsible for taking an account id and returning an array of jobs
  private _fetchDataTask!: Task<[string], Array<WorkableJobDataV1>>;

  constructor(host: ReactiveControllerHost, workableAccountId: string) {
    // Ensure we are working with a valid Workable Account ID
    WorkableAccountValidator.validate(workableAccountId);
    // Make sure we can communicate with the element hosting this controller
    this._host = host;
    // Make sure we store the Workable Account ID
    this._workableAccountId = workableAccountId;
    // Install ourselves into the host element
    host.addController(this);
  }

  hostConnected() {
    // See the @lit-labs/task documentation for background on this approach
    this._fetchDataTask = new Task<[string], Array<WorkableJobDataV1>>(
      this._host,
      WorkableController.fetchJobsDataFromApi,
      () => [this._workableAccountId]
    );
  }

  /**
   * Fetches a list of publicly available jobs for a given Workable account
   *
   * @param accountId {string} A valid Workable Account ID
   * @returns {Promise<WorkableJobDataV1[]>} An array of publicly available jobs for that account
   *
   * @throws Will throw an error if it is unable to return the data for any reason
   */
  static async fetchJobsDataFromApi(
    accountId: [string]
  ): Promise<WorkableJobDataV1[]> {
    // Calculate the correct endpoint based on the account ID supplied
    const apiEndpoint = `https://apply.workable.com/api/v1/widget/accounts/${accountId}?origin=embed`;

    try {
      const response = await fetch(apiEndpoint, { method: 'GET' });

      // Parse the response and return just the data we care about
      if (response.status >= 200 && response.status <= 299) {
        const jsonResponse: WorkableApiResponseV1 = await response.json();
        return jsonResponse.jobs;
      }

      // Handle invalid HTTP response codes
      throw new Error(`Invalid HTTP status code: ${response.status}`);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(`Unable to fetch data from Workable API \n ${error}`);
      throw new Error(error);
    }
  }

  render(renderFunctions: StatusRenderer<Array<WorkableJobDataV1>>) {
    return this._fetchDataTask.render(renderFunctions);
  }
}
