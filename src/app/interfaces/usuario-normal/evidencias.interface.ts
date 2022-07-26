export interface Evidencias{
    id_evidencias: number;
    id_usuarios: number;
    nombres_usuario: string;
    nombre_unidad: string;
    nombre_registros: string;
    nombre_ambito_academico: string;
    nombre_ambito_geografico: string;
    nombre_criterios: string;
    correo_usuario: string;
    nombre_procesos: string;
    nombre_debilidades: string;
    id_estados: number;
}

export interface GuardarEvidencias{
    fk_id_usuario: number;
    fk_id_debilidades: number;
    fk_id_unidad: number;
    fk_id_criterios: number;
    fk_id_registros: number;
    fk_id_procesos: number;
    fk_id_estado: number;
    fk_id_ambito_academico: number;
    fk_id_ambito_geografico: number;
    nombre_cliente: string;
    e_correo_usuario: string;
    numero_folio: string;
    numero_mejoras: string;
    descripcion: string;
    resultado: string;
    almacenamiento: string;
    unidades_personas_evidencias: string;
    palabra_clave: string;
    nombre_corto_evidencia: string;
}

export interface Obteneridevidencias{
    nombre_cliente: string;
    correo_usuario: string;
    fk_id_debilidades: number;
    fk_id_unidad: number;
    fk_id_criterios: number;
    fk_id_registros: number;
    fk_id_procesos: number;
    fk_id_estado: number;
    fk_id_ambito_academico: number;
    fk_id_ambito_geografico: number;
}