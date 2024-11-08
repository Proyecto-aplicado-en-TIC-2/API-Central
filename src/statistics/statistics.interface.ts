import {
  EmergencyReports,
  Gender,
} from 'src/emergency-reports/dto/create-emergency-reports.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { Cases } from 'src/webSockets/websocket.dto';

export interface IStatisticsRepostiory {
  //-------------------- GET ------------------------

  /**
   * Obtiene todos los reportes que coinciden con la clave de partición especificada.
   * @param partition_key - El tipo de caso (por ejemplo, Incendio, Medico).
   * @returns Una promesa que resuelve con una matriz de reportes de emergencia agrupados por clave de partición.
   */
  GetAllReportByPartitionKey(
    partition_key: Cases,
  ): Promise<EmergencyReports[][]>;

  /**
   * Obtiene todos los reportes del mes actual.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia del mes actual.
   */
  GetAllReportByMonth(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes del trimestre actual.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia del trimestre actual.
   */
  GetAllReportByQuarter(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes del año actual.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia del año actual.
   */
  GetAllReportByYear(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes agrupados por cuadrante.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia por cuadrante.
   */
  GetAllReportByQuadrant(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes agrupados por bloque.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia por bloque.
   */
  GetAllReportByBlock(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes agrupados por aula.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia por aula.
   */
  GetAllReportByClassroom(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes que coinciden con una relación específica con la universidad y tipo de caso.
   * @param relationshipWithTheUniversity - La relación con la universidad (por ejemplo, Estudiante, Visitante).
   * @param partition_key - El tipo de caso.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia.
   */
  GetAllReportByRelationshipWithUniversity(
    relationshipWithTheUniversity: RelationshipWithTheUniversity,
    partition_key: Cases,
  ): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes que coinciden con un género específico.
   * @param gender - Género del paciente.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia filtrados por género.
   */
  GetAllReportByGender(gender: Gender): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes que se encuentran dentro de un rango de edad específico.
   * @param age - El rango de edad como cadena.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia dentro del rango de edad.
   */
  GetAllReportByRangeOfAge(age: string): Promise<EmergencyReports[]>;

  /**
   * Calcula el tiempo promedio de respuesta para un tipo de caso específico.
   * @param partition_key - El tipo de caso.
   * @returns Una promesa que resuelve con el tiempo promedio de respuesta para el tipo de caso.
   */
  GetAllReportByAvrgResponseTimeByCase(
    partition_key: Cases,
  ): Promise<EmergencyReports[]>;

  /**
   * Calcula el tiempo promedio de atención para un tipo de caso específico.
   * @param partition_key - El tipo de caso.
   * @returns Una promesa que resuelve con el tiempo promedio de atención para el tipo de caso.
   */
  GetAllReportByAvrgAttentionTimeByCase(
    partition_key: Cases,
  ): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes que requieren seguimiento.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia que requieren seguimiento.
   */
  GetAllReportByFollowUp(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes agrupados por tipo de equipo utilizado.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia por tipo de equipo.
   */
  GetAllReportByEquipmentType(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes agrupados por fuente del equipo utilizado.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia por fuente de equipo.
   */
  GetAllReportByEquipmentSource(): Promise<EmergencyReports[]>;

  /**
   * Obtiene todos los reportes donde se utilizó una línea segura de atención.
   * @returns Una promesa que resuelve con una lista de reportes de emergencia donde se utilizó una línea segura.
   */
  GetAllReportByUsedSecureLine(): Promise<EmergencyReports[]>;
}
