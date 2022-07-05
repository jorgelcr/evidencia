export interface misEvidenciaDirector {
    id_evidencias: string ;
    numero_folio?: string ;
    fecha_evidencia: Date ;
    numero_mejoras: string ;
    descripcion: string ;
    resultado: string ;
    almacenamiento: string ;
    unidades_personas_evidencias: string ;
    palabra_clave: string ;
    nombre_corto_evidencia: string ;

    nombre_unidad      : string;
    nombre_procesos      : string;
    nombre_registros     : string;
    nombre_ambito_academico      : string;

    estado_evidencia_responsable: number;
    estado_evidencia_dac: number;
    revisado_reponsable: boolean;
    revisado_dac: boolean;

}