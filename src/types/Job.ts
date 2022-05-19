import Facility from './Facility';
import {JobStatus} from './JobStatus';
import Skill from './Skill';

export interface Job {
  jobId: number;
  jobTitle: string;
  description: string;
  jobStartDateTimeUtc: string;
  jobEndDateTimeUtc: string;
  jobPostedDateTimeUtc: string;
  comments: string;
  gracePeriodToCancelMinutes: number;
  jobGracePeriodEndDateTimeUtc: string;
  jobStatus: JobStatus;
  jobsStatusName: string;
  responsibilities: string;
  experience: string;
  facility: Facility;
  cancelUntil: string;
  isNightShift: boolean;
  jobSkills: Skill[];
}
