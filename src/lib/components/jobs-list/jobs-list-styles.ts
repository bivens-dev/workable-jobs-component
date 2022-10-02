import { css } from 'lit';

export const styles = css`
  #location-selection-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 1.7rem;
    font-family: var(--workable-widget-font-header);
    padding: 0.5rem 1rem;
  }

  select#location-select {
    padding: 1rem 2rem;
  }

  ul#job-listings {
    list-style: none;
    padding-inline-start: 0.5rem;
    padding-inline-end: 0.5rem;
  }
`;
