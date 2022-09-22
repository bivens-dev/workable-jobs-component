import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { WorkableController } from './controllers/tasks/fetch-workable-data-job.js';
import { WorkableJobDataV1 } from './types/workable-api-types.js';
import { WorkableAccountValidator } from './services/workable-account-validator.js';

import './components/jobs-list/jobs-list.js';

/**
 * @fires jobs-fetched - Fires when it successfully gets the data from the Workable API.
 */
export class WorkableWidgetImpl extends LitElement {
  /// The Workable account id we want to work with
  @property({ type: String, attribute: 'account-id' })
  workableAccountId?: string;

  // How strictly should we check user supplied data
  @property({ type: Boolean, attribute: 'relaxed-validation' })
  relaxedValidation!: boolean;

  // The controller contains the logic for working with the API
  private _workableController?: WorkableController;

  override connectedCallback(): void {
    super.connectedCallback();
    WorkableAccountValidator.validate(
      this.workableAccountId,
      this.relaxedValidation
    );
    this._workableController = new WorkableController(
      this,
      this.workableAccountId!
    );
  }

  override render() {
    return this._workableController!.render({
      complete: (apiResults: Array<WorkableJobDataV1>) =>
        this._onFetchComplete(apiResults),
      pending: () => WorkableWidgetImpl._onFetchPending(),
      error: (e: any) => WorkableWidgetImpl._onFetchError(e),
    });
  }

  // What to do and show once we have a successful response from the Workable API
  private _onFetchComplete(apiResults: Array<WorkableJobDataV1>) {
    this.dispatchEvent(
      new CustomEvent('jobs-fetched', { bubbles: true, composed: true })
    );
    return html` <jobs-list .openPositions=${apiResults}></jobs-list> `;
  }

  // What to do and show while we are still waiting for a response from the Workable API
  private static _onFetchPending(): TemplateResult<1> {
    return WorkableWidgetImpl._renderPendingState();
  }

  // What to do and show if we encounter and error from the Workable API
  private static _onFetchError(error: any): TemplateResult<1> {
    // eslint-disable-next-line no-console
    console.error(error);
    return WorkableWidgetImpl._renderErrorState();
  }

  private static _renderPendingState(): TemplateResult<1> {
    return html` <h1>Pending</h1> `;
  }

  private static _renderErrorState(): TemplateResult<1> {
    return html` <h1>Error</h1> `;
  }
}
