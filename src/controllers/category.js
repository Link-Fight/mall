import base from './index.js'
// category_guid* page_index page_size
function getCategory() {
  return base('/wechat/mall/category')
}
function getProductList({ category_guid, page_index, page_size, keyword }) { return base('/wechat/mall/category/product', { category_guid, page_index, page_size, keyword }) }
function getShopProductList({ shop_guid, page_index, page_size, keyword }) { return base('/wechat/mall/shop/product', { shop_guid, page_index, page_size, keyword }) }
export { getProductList, getShopProductList, getCategory }