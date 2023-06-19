import { create } from 'apisauce';

const baseURL = 'https://645ce732e01ac6105896bbce.mockapi.io/';

const client = create({
  baseURL
});

const getGoal = async id => {
  return await client.get(`/goal/:${id}`);
};
