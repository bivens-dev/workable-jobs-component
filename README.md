# \<ea-jobs>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i workable-widget
```

## Usage

```html
<script type="module">
  import 'workable-widget/workable-widget.js';
</script>

<workable-widget account-id="123456"></workable-widget>
```

**Note:** The widget will attempt to validate that you have supplied a valid account id by default. You can relax these checks somewhat by supplying an optional `relaxed-validation` attribute on the element like so
```html
<workable-widget account-id="123456" relaxed-validation></workable-widget>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
