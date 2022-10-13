import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    color: var(--workable-widget-font-color, #000);
    font-family: var(--workable-widget-font, sans-serif);
    font-size: clamp(16px, 1rem, 22px);
    margin-block-start: 1rem;
    margin-block-end: 1rem;
  }

  a {
    color: var(--workable-widget-link-color);
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    font-weight: 700;
    text-decoration: underline;
    color: var(--workable-widget-link-color-hover);
  }

  .job {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
  }

  .job-location {
    font-size: 1.1rem;
  }
`;
