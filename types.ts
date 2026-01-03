
export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

export interface FamilyStoryResponse {
  familySpirit: string;
  memberInsights: {
    name: string;
    insight: string;
  }[];
  futureBlessing: string;
}
