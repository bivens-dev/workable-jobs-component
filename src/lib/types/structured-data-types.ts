/**
 * This represents the data structure for the schema.org data
 * we expect to see in the component slot in order to
 * have enough data to trigger Google's rich snippets.
 */
export interface OrganizationData {
  type: string;
  name: string;
  sameAs: string;
  logo?: string;
}
