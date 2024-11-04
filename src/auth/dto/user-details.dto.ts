enum DocumetnType{
  CedulaDeCiudadania,
  TarjetDeIdentidad,
  CedulaDeExtranjeria
}

enum BloodType {
  A_POS = "A+",
  O_POS = "O+",
  B_POS = "B+",
  AB_POS = "AB+",
  A_NEG = "A-",
  O_NEG = "O-",
  B_NEG = "B-",
  AB_NEG = "AB-"
}

export class UserDetails{
  public idUniversity: number;
  public documetnType: DocumetnType;
  public documentNumber: string;
  public address: string;
  public emergencyContactPhoneNumber: number;
  public birthday: string;
  public bloodType: BloodType;
  public allergies: string;
  public dependentMedications: string;
  public disabilities: string;
  
}