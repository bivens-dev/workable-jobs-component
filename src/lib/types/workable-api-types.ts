/* eslint-disable camelcase */

/**
 * The interface of an individual Job listing from the Workable V1 API
 */
export interface WorkableJobDataV1 {
  title: string;
  shortcode: string;
  code: string | null;
  employment_type: string | null;
  telecommuting: boolean;
  department: string;
  url: string;
  shortlink: string;
  application_url: string;
  published_on: string;
  created_at: string;
  country: string;
  city: string | null;
  state: string | null;
  education: string | null;
  experience: string | null;
  function: string | null;
  industry: string | null;
}

/**
 * The interface of the response from the Workable V1 API Endpoint
 */
export interface WorkableApiResponseV1 {
  name: string;
  description: string;
  jobs: [WorkableJobDataV1];
}
