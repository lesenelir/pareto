
// import home from '/Users/zhangyuanqing/works/github/pareto/examples/mobx/app/home/index.tsx';
const home = {};

import { setRuntimeConfig } from "@pareto/core/node";

const pages = { home };

const assets = __non_webpack_require__('../client/webpack-assets.json');

setRuntimeConfig({ pages, assets });