export interface Region {
  name: string;
  code: string;
}

export interface RegionGroup {
  [key: string]: Region[];
}

export const AWS_REGIONS: RegionGroup = {
  'NORTH AMERICA': [
    { name: 'US East (N. Virginia)', code: 'us-east-1' },
    { name: 'US East (Ohio)', code: 'us-east-2' },
    { name: 'US West (N. California)', code: 'us-west-1' },
    { name: 'US West (Oregon)', code: 'us-west-2' },
    { name: 'Canada (Central)', code: 'ca-central-1' },
  ],
  'ASIA PACIFIC': [
    { name: 'Asia Pacific (Mumbai)', code: 'ap-south-1' },
    { name: 'Asia Pacific (Hyderabad)', code: 'ap-south-2' },
    { name: 'Asia Pacific (Singapore)', code: 'ap-southeast-1' },
    { name: 'Asia Pacific (Sydney)', code: 'ap-southeast-2' },
    { name: 'Asia Pacific (Tokyo)', code: 'ap-northeast-1' },
  ],
  'EUROPE': [
    { name: 'Europe (Ireland)', code: 'eu-west-1' },
    { name: 'Europe (London)', code: 'eu-west-2' },
    { name: 'Europe (Frankfurt)', code: 'eu-central-1' },
    { name: 'Europe (Paris)', code: 'eu-west-3' },
    { name: 'Europe (Stockholm)', code: 'eu-north-1' },
    { name: 'Europe (Milan)', code: 'eu-south-1' },
    { name: 'Europe (Spain)', code: 'eu-south-2' },
    { name: 'Europe (Zurich)', code: 'eu-central-2' },
  ],
  'OTHER': [
    { name: 'South America (São Paulo)', code: 'sa-east-1' },
    { name: 'Africa (Cape Town)', code: 'af-south-1' },
    { name: 'Middle East (Bahrain)', code: 'me-south-1' },
    { name: 'Middle East (UAE)', code: 'me-central-1' },
    { name: 'AWS GovCloud (US-East)', code: 'us-gov-east-1' },
    { name: 'AWS GovCloud (US-West)', code: 'us-gov-west-1' },
  ]
};