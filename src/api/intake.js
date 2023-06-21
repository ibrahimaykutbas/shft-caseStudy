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
  const params = {
    amount: Number(amount),
    "unit": "ml",
    createdAt: new Date()
  }
  return await client.post('intake/', params);
};

const updateIntake = async (id, amount) => {
  const params = {
    amount: Number(id[1]),
    "unit": "ml",
    createdAt: new Date()
  }
  return await client.put(`intake/${id[0]}`, params);
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
