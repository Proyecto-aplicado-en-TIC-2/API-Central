import { APH } from '../models/aph.model';

export interface IPrehospitalCareRepository {
  GetAllAPHs(): Promise<APH[]>;
}
