export interface Evidencias{
    id_evidencias: number;
    nombres_usuario: string;
    nombre_unidad: string;
    nombre_registros: string;
    nombre_ambito_academico: string;
    nombre_criterios: string;
    correo_usuario: string;
    nombre_procesos: string;
    nombre_debilidades: string;
    id_estados: number;
}

export interface GuardarEvidencias{
    nombre_cliente: string;
    fk_id_usuario: number;
    fk_id_debilidades: number;
    fk_id_unidad: number;
    fk_id_criterios: number;
    fk_id_registros: number;
    fk_id_procesos: number;
    fk_id_estado: number;
    fk_id_ambito_academico: number;
}