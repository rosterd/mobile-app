import {User} from 'types/User';
import Constants from 'expo-constants';
import axios from './axiosSetup';
import {Job} from 'types/Job';
import {PagedItems} from 'types/PagedItems';

const apiUrl = Constants.manifest?.extra?.ROSTERD_API_URL;
const version = '1';

const url = `${apiUrl}/api/v${version}`;

const pageNumberDefault = 1;
const pageSizeDefault = 10;

export const getUserInfo = (): Promise<User> => {
  return axios.get(`${url}/preferences/my`).then((result) => {
    return result.data;
  });
};

export const updateUserInfo = (user: Partial<User>): Promise<User> => {
  return axios
    .put<User>(`${url}/preferences/my`, user)
    .then((result) => result.data);
};

// jobs
export const getMyJobs = (
  pageNumber = pageNumberDefault,
  pageSize = pageSizeDefault,
): Promise<PagedItems<Job>> => {
  return axios
    .get(`${url}/jobs/my/current`, {
      params: {pageNumber, pageSize},
    })
    .then((result) => result.data);
};

export const getJobHistory = (
  pageNumber = pageNumberDefault,
  pageSize = pageSizeDefault,
): Promise<PagedItems<Job>> => {
  return axios
    .get(`${url}/job/my/history`, {
      params: {pageNumber, pageSize},
    })
    .then((result) => result.data);
};

export const getJobList = (
  pageNumber = pageNumberDefault,
  pageSize = pageSizeDefault,
): Promise<PagedItems<Job>> => {
  return axios
    .get(`${url}/jobs/my/relevant`, {
      params: {pageNumber, pageSize},
    })
    .then((result) => result.data);
};

export const acceptJob = (jobId: number): Promise<PagedItems<boolean>> => {
  return axios
    .put(`${url}/jobs/${jobId}/confirmation`)
    .then((result) => result.data);
};
export const rejectJob = (jobId: number): Promise<PagedItems<boolean>> => {
  return axios
    .delete(`${url}/jobs/${jobId}/cancellations`)
    .then((result) => result.data);
};

// End jobs

export const getCompletedHistory = (
  pageNumber = pageNumberDefault,
  pageSize = pageSizeDefault,
): Promise<PagedItems<Job>> => {
  return axios
    .get(`${url}/jobs/my/history/completed`, {
      params: {pageNumber, pageSize},
    })
    .then((result) => result.data);
};

export const getCancelledHistory = (
  pageNumber = pageNumberDefault,
  pageSize = pageSizeDefault,
): Promise<PagedItems<Job>> => {
  return axios
    .get(`${url}/jobs/my/history/cancelled`, {
      params: {pageNumber, pageSize},
    })
    .then((result) => result.data);
};
