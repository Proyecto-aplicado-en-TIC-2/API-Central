import { Brigadier } from '../models/brigadiers.model';

export interface IBrigadiersRepository {
  GetAllBrigadiers(): Promise<Brigadier[]>;
  GetBrigadierById(id: string): Promise<Brigadier>;
  GetBrigadierByEmail(mail: string): Promise<Brigadier>;
  CreateBrigade(brigadier: Brigadier): Promise<Brigadier>;
}
