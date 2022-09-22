// This just takes in an instance of a WorkableJob and created the required
// schema.org json-ld markup.

import { html, TemplateResult } from 'lit';
import { WorkableJobDataV1 } from '../types/workable-api-types.js';
import { OrganizationData } from '../types/structured-data-types.js';

/**
 * A class that takes the response from the WorkableAPI and enriches it
 * with some basic company level data in order to ensure that we now have
 * enough data to trigger Google's rich snippet functionality.
 *
 */
export class WorkableJobSchemaGenerator {
  #companyDetails: OrganizationData;

  #rawData?: WorkableJobDataV1;

  constructor(companyDetails: OrganizationData) {
    this.#companyDetails = companyDetails;
  }

  /**
   * Convert from the raw Workable data format into a valid
   * and optimized schema.org snippet for that particular job.
   *
   * @example
   * const schemaGenerator = new WorkableJobSchemaGenerator(orgData);
   * html`${schemaGenerator.convert(aWorkableJobData)}`;
   *
   * @param workableJob A job result from Workable's V1 API
   * @returns The full schema markup syntax to be put on the page
   */
  convert(workableJob: WorkableJobDataV1): TemplateResult<1> {
    // Store the raw data so it is easy to share across the class
    this.#rawData = workableJob;

    const template = html`
      <script type="application/ld+json">
        {
          "@context" : "https://schema.org/",
          "@type" : "JobPosting",
          "title" : "${this.#rawData.title}",
          "description" : "${this.#generateDescription()}",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Job Number",
            "value": "${this.#rawData.code}"
          },
          "datePosted" : "${this.#rawData.created_at}",
          "employmentType" : "${this.#generateEmploymentType()}",
          "hiringOrganization" : {
            "@type" : "Organization",
            "name" : "${this.#companyDetails.name}",
            "sameAs" : "${this.#companyDetails.sameAs}",
            "logo" : "${this.#companyDetails.logo}"
          },
          ${this.#educationRequirements()}
          ${this.#generateLocation()}
        }
      </script>
    `;

    return html`${this.#companyDetails.name}`;
  }

  #generateDescription() {
    return html`
      <p>Ready for your next ${this.#rawData?.industry} role?</p>
      <p>
        ${this.#companyDetails.name} is currently hiring for a
        ${this.#rawData?.employment_type} ${this.#rawData?.title} based in
        ${this.#rawData?.city} ${this.#rawData?.country}
      </p>
      <p>
        This is a ${this.#rawData?.experience} role and requires a
        ${this.#rawData?.education} to apply.
      </p>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  #generateEmploymentType() {
    // eslint-disable-next-line no-shadow
    enum employmentType {
      CONTRACTOR,
      FULL_TIME,
      PART_TIME,
      TEMPORARY,
      INTERN,
      VOLUNTEER,
      PER_DIEM,
      OTHER,
    }
    // return employmentType.CONTRACTOR;
    throw Error('Not Yet Implemented');
  }

  #educationRequirements(): TemplateResult<1> {
    const educationRequirement = this.#rawData!.education;
    if (educationRequirement === null || educationRequirement === '') {
      return html``;
    }

    // Do some basic normalization to make the requirements matching process more robust
    const normalizedEducationalRequirement = educationRequirement
      .toLowerCase()
      .split(' ')
      .join('');

    // https://developers.google.com/search/docs/advanced/structured-data/job-posting#education-and-experience-properties-beta
    if (normalizedEducationalRequirement.includes('highschool')) {
      return html`{ "@type": "EducationalOccupationalCredential",
      "credentialCategory": "high school" },`;
    }

    if (
      normalizedEducationalRequirement.includes('associate') ||
      normalizedEducationalRequirement.includes('certification')
    ) {
      return html`{ "@type": "EducationalOccupationalCredential",
      "credentialCategory": "associate degree" },`;
    }

    if (normalizedEducationalRequirement.includes('bachelor')) {
      return html`{ "@type": "EducationalOccupationalCredential",
      "credentialCategory": "bachelor degree" },`;
    }

    // Capture terms like post-graduate postdoc etc..
    if (
      normalizedEducationalRequirement.includes('phd') ||
      normalizedEducationalRequirement.includes('post') ||
      normalizedEducationalRequirement.includes('master')
    ) {
      return html`{ "@type": "EducationalOccupationalCredential",
      "credentialCategory": "postgraduate degree" },`;
    }

    return html`"educationRequirements": { "@type":
    "EducationalOccupationalCredential", "credentialCategory": "bachelor degree"
    },`;
  }

  #generateLocation() {
    // NOTE: No trailing comma on the JSON as it's the last
    if (this.#rawData?.telecommuting === true) {
      return html`"applicantLocationRequirements": { "@type": "Country", "name":
      "${this.#rawData!.country}" }, "jobLocationType": "TELECOMMUTE"`;
    }
    return html`"jobLocation": { "@type": "Place", "address": { "@type":
    "PostalAddress", "addressLocality": "${this.#rawData!.city}",
    "addressRegion": "${this.#rawData!.state}", "addressCountry":
    "${this.#rawData!.country}" } }`;
  }
}
