/**
* pinyin Helper
* @example
*     <%- pinyin() %>
*/

hexo.extend.helper.register('pinyin', function () {
  var pinyin = require('pinyin');
  return pinyin;
});
