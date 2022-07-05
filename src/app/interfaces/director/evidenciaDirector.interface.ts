export interface evidenciaDirector {
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

    nombre_procesos      : string;
    nombre_registros    : string;
    nombre_debilidades  : string;
    nombre_criterios    : string;
    tipo_estados    : string;
    id_estados    : number;
    estado_evidencia_responsable: number;
    estado_evidencia_dac: number;
    revisado_reponsable: boolean;
    revisado_dac: boolean;
}