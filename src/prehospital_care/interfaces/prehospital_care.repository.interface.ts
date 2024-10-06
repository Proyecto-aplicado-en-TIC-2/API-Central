import { APH } from '../models/aph.model';

export interface IPrehospitalCareRepository {
  GetAllAPHs(): Promise<APH[]>;
  GetAPHById(id: string): Promise<APH>;
  GetAPHByMail(mail: string): Promise<APH>;
  CreateAPH(aph: APH): Promise<APH>;
  UpdateAPHById(aph: APH): Promise<string>;
  DeleteAPHById(aph: APH): void;
}
