import { create } from 'apisauce';

const baseURL = 'https://645ce732e01ac6105896bbce.mockapi.io/';

const client = create({
  baseURL
});

const getIntakes = async () => {
  return await client.get('/intake');
};

const getIntake = async id => {
  return await client.get(`intake/:${id}`);
};

const createIntake = async amount => {
  return await client.post('intake/', { amount });
};

const updateIntake = async (id, data) => {
  return await client.put(`intake/${id}`, data);
};

const deleteIntake = async id => {
  return await client.delete(`intake/${id}`);
};

export default {
  getIntakes,
  getIntake,
  createIntake,
  updateIntake,
  deleteIntake
};
