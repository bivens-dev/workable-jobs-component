export interface WorkableJobData {
  "title": string,
  "shortcode": string,
  "code": string,
  "employment_type": string,
  "telecommuting": boolean,
  "department": string,
  "url": string,
  "shortlink": string,
  "application_url": string,
  "published_on": string,
  "created_at": string,
  "country": string,
  "city": string,
  "state": string,
  "education": string,
  "experience": string,
  "function": string,
  "industry": string
 }

export interface WorkableApiResponse {
  "name": string,
  "description": string,
  "jobs": [WorkableJobData]
}