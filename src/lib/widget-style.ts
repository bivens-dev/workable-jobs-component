import { css } from 'lit';

export const defaultStyles = css`
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
