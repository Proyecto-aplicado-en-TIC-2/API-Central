import { BrigadeMember } from '../models/brigadiers.model';

export interface IBrigadiersRepository {
  GetAllBrigadiers(): Promise<BrigadeMember[]>;
  GetBrigadiersById(id: string): Promise<BrigadeMember>;
  GetBrigadiersByEmail(mail: string): Promise<BrigadeMember>;
}
