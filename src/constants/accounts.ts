export interface Account {
  AccountID: string;
  AccountName: string;
  ActiveRegions: string;
  Logo?: string;
  ImgURL?: string;
  Status?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export const MOCK_ACCOUNTS: Account[] = [
  {
    AccountID: "123456789012",
    AccountName: "Production Environment",
    ActiveRegions: JSON.stringify(["us-east-1", "us-west-2", "eu-west-1"]),
    Status: "Active",
    CreatedAt: "2024-01-15T10:30:00Z",
    UpdatedAt: "2024-10-20T14:22:00Z"
  },
  {
    AccountID: "234567890123",
    AccountName: "Development Environment",
    ActiveRegions: JSON.stringify(["us-east-1", "us-west-2"]),
    Status: "Active",
    CreatedAt: "2024-02-10T09:15:00Z",
    UpdatedAt: "2024-10-18T11:45:00Z"
  },
  {
    AccountID: "345678901234",
    AccountName: "Staging Environment",
    ActiveRegions: JSON.stringify(["us-east-1"]),
    Status: "Active",
    CreatedAt: "2024-03-05T16:20:00Z",
    UpdatedAt: "2024-10-15T08:30:00Z"
  },
  {
    AccountID: "456789012345",
    AccountName: "Testing Environment",
    ActiveRegions: JSON.stringify(["us-west-2", "eu-west-1"]),
    Status: "Active",
    CreatedAt: "2024-04-12T13:45:00Z",
    UpdatedAt: "2024-10-12T17:10:00Z"
  },
  {
    AccountID: "567890123456",
    AccountName: "Analytics Platform",
    ActiveRegions: JSON.stringify(["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"]),
    Status: "Active",
    CreatedAt: "2024-05-20T11:30:00Z",
    UpdatedAt: "2024-10-10T15:20:00Z"
  },
  {
    AccountID: "678901234567",
    AccountName: "Security & Compliance",
    ActiveRegions: JSON.stringify(["us-east-1", "eu-west-1"]),
    Status: "Active",
    CreatedAt: "2024-06-08T14:15:00Z",
    UpdatedAt: "2024-10-08T12:40:00Z"
  },
  {
    AccountID: "789012345678",
    AccountName: "Data Lake Storage",
    ActiveRegions: JSON.stringify(["us-west-2", "eu-central-1"]),
    Status: "Active",
    CreatedAt: "2024-07-03T10:00:00Z",
    UpdatedAt: "2024-10-05T09:25:00Z"
  },
  {
    AccountID: "890123456789",
    AccountName: "Machine Learning Workloads",
    ActiveRegions: JSON.stringify(["us-east-1", "us-west-2", "ap-southeast-1"]),
    Status: "Active",
    CreatedAt: "2024-08-18T15:30:00Z",
    UpdatedAt: "2024-10-03T13:15:00Z"
  },
  {
    AccountID: "901234567890",
    AccountName: "Backup & Disaster Recovery",
    ActiveRegions: JSON.stringify(["us-east-1", "us-west-2", "eu-west-1", "ap-south-1", "sa-east-1"]),
    Status: "Active",
    CreatedAt: "2024-09-10T12:45:00Z",
    UpdatedAt: "2024-10-01T16:30:00Z"
  },
  {
    AccountID: "012345678901",
    AccountName: "Legacy Systems Migration",
    ActiveRegions: JSON.stringify(["us-east-1"]),
    Status: "Active",
    CreatedAt: "2024-09-25T08:20:00Z",
    UpdatedAt: "2024-09-28T14:50:00Z"
  },
  {
    AccountID: "112233445566",
    AccountName: "Mobile App Backend",
    ActiveRegions: JSON.stringify(["us-east-1", "eu-west-1", "ap-southeast-1"]),
    Status: "Active",
    CreatedAt: "2024-08-05T11:10:00Z",
    UpdatedAt: "2024-09-20T10:35:00Z"
  },
  {
    AccountID: "223344556677",
    AccountName: "IoT Data Processing",
    ActiveRegions: JSON.stringify(["us-west-2", "eu-central-1", "ap-northeast-1"]),
    Status: "Active",
    CreatedAt: "2024-07-22T13:25:00Z",
    UpdatedAt: "2024-09-15T12:20:00Z"
  }
];

export const TOTAL_ACCOUNTS_COUNT = MOCK_ACCOUNTS.length;