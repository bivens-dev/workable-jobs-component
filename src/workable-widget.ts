import { customElement } from 'lit/decorators.js';
import { styles } from './lib2/styles.css.js';
import { WorkableWidgetImpl } from './lib2/workable-widget.js';

/**
 * A responsive and accessable top navigation bar based on the article at:
 * https://web.dev/website-navigation/
 *
 * @cssprop {Text Color} [--top-nav-text-color=#000] - The color of the text
 * @cssprop {Font Size} [--top-nav-font-size=1.6rem] - The size of the text
 * @cssprop {Font Family} [--top-nav-font-family=system-ui, sans-serif] - The family of the text
 * @cssprop {Color Shades Dark} [--color-shades-dark=rgb(25, 25, 25)] - The dark color shade
 * @cssprop {Color Shades Light} [--color-shades-light=rgb(165, 167, 175)] - The light color shade
 * @cssprop {Color Highlight} [--color-highlight=rgb(24, 54, 145)] - The highlight color
 *
 * @csspart button - The hamburger menu button
 * @csspart link-list - The unordered list of links
 *
 * @fires menu-opened - Fires when the hamburger menu is opened.
 * @fires menu-closed - Fires when the hamburger menu is closed.
 */
@customElement('workable-widget')
export class WorkableWidget extends WorkableWidgetImpl {
  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'workable-widget': WorkableWidget;
  }
}
