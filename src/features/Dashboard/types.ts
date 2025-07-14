// types.ts
export interface RankData {
  rank: number;
  totalStudents: number;
  termScore: number;
  termTotal: number;
  topSubject: {
    subject: string;
    score: number;
  };
  lowSubject: {
    subject: string;
    score: number;
  };
}
