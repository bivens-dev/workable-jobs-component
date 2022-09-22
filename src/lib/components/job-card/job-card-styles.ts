import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    color: var(--workable-widget-font-color, #000);
    font-family: var(--workable-widget-font, sans-serif);
    font-size: clamp(16px, 1rem, 22px);
  }
`;
