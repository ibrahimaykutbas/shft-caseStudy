import { create } from 'apisauce';

const baseURL = 'https://world.openfoodfacts.org/api/v0/product/';

const client = create({
  baseURL
});

const getProductInfo = async barcode => {
  return await client.get(`${barcode}.json`);
};

export default {
    getProductInfo
};
