/**
* Asset Img Helper
* @example
*     <%- asset_img(post, slug) %>
*/

hexo.extend.helper.register('asset_img', function (post, slug) {
    const url = require('url');
    const pathFn = require('path');

    // PostAsset.path is file path relative to `public_dir`
    // no need to urlescape, #1562
    // strip /\.html?$/ extensions on permalink, #2134
    let assetPath = pathFn.join(post.path.replace(/\.html?$/, ''), slug);
    return url.resolve('/', assetPath);
});