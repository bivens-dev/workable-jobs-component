import { ReactiveController, ReactiveControllerHost } from 'lit';

export class JobStructuredDataController implements ReactiveController {
  private host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  // eslint-disable-next-line class-methods-use-this
  hostUpdated() {
    // eslint-disable-next-line no-console
    console.debug('sdf');
  }
}
