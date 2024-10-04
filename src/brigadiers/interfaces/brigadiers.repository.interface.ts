import { BrigadeMember } from '../models/brigadiers.model';

export interface IBrigadiersRepository {
  GetAllBrigadiers(): Promise<BrigadeMember[]>;
}
