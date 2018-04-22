/**
* Thumbnail Helper
* @description Get the thumbnail url from a post
* @example
*     <%- thumbnail(post) %>
*/
hexo.extend.helper.register('thumbnail', function (post) {
    const asset_img = hexo.extend.helper.get('asset_img').bind(this);

    if (!!post.thumbnail)
        return post.thumbnail;

    if (!!post.banner)
        return asset_img(post, post.banner);

    return '';
});