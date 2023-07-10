import axios from 'axios';
import queryString from 'query-string';
import { CreatorInterface, CreatorGetQueryInterface } from 'interfaces/creator';
import { GetQueryInterface } from '../../interfaces';

export const getCreators = async (query?: CreatorGetQueryInterface) => {
  const response = await axios.get(`/api/creators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCreator = async (creator: CreatorInterface) => {
  const response = await axios.post('/api/creators', creator);
  return response.data;
};

export const updateCreatorById = async (id: string, creator: CreatorInterface) => {
  const response = await axios.put(`/api/creators/${id}`, creator);
  return response.data;
};

export const getCreatorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/creators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCreatorById = async (id: string) => {
  const response = await axios.delete(`/api/creators/${id}`);
  return response.data;
};
