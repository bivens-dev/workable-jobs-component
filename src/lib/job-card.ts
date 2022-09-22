import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WorkableJobData } from './types.js';
import { defaultStyles } from './job-card-style.js';

@customElement('workable-job-card')
export class WorkableJobCard extends LitElement {
  static styles = [defaultStyles];

  // The job that we will be displaying
  @property({ type: Object })
  job?: WorkableJobData;

  private __renderStructuredData() {
    if (this.#isElegibleForRemoteSnippet()) {
      console.log('Render Remote Work Structure Data Template');
    } else {
      console.log('Render regular job structured data template');
    }
  }

  // Convenience function to tell if the job is eligible for special markup
  #isElegibleForRemoteSnippet() {
    // Make sure we have a job to work with
    if (this.job === undefined) {
      return false;
    }

    // Make sure it fits the criteria for rich snippets
    if (
      this.job.telecommuting === true &&
      this.job.employment_type === 'Full Time'
    ) {
      return true;
    }

    // If we made it this far it's because we didn't meet the criteria
    return false;
  }

  remoteStatusAsValue() {
    if (this.#isElegibleForRemoteSnippet()) {
      return html`"TELECOMMUTE"`;
    }

    return html` { "@type": "Place", "address": { "@type": "PostalAddress",
    "addressLocality": "${this.job?.city}", "addressRegion":
    "${this.job?.state}", "addressCountry": "${this.job?.country}" }`;
  }

  #renderRemoteJobStructuredData() {
    if (this.job === undefined) {
      return html``;
    }

    return html`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          "title": "${this.job.title}",
          "description": "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Job Code",
            "value": "${this.job.code}"
          },
          "datePosted": "${this.job.created_at}",
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "${this.job.country}"
          },
          "jobLocationType": "TELECOMMUTE",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Google",
            "sameAs": "http://www.google.com",
            "logo": "http://www.example.com/images/logo.png"
          }
        }
      </script>
    `;
  }

  protected render() {
    console.log(this.job);
    return html`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          "title": "Software Engineer",
          "description": "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Google",
            "value": "1234567"
          },
          "datePosted": "2017-01-18",
          "validThrough": "2017-03-18T00:00",
          "employmentType": "CONTRACTOR",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Google",
            "sameAs": "http://www.google.com",
            "logo": "http://www.example.com/images/logo.png"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1600 Amphitheatre Pkwy",
              "addressLocality": "Mountain View",
              "addressRegion": "CA",
              "postalCode": "94043",
              "addressCountry": "US"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
              "@type": "QuantitativeValue",
              "value": 40.0,
              "unitText": "HOUR"
            }
          }
        }
      </script>
    `;
  }
}
