export interface Usuario{
    id_usuarios?     : string;
    rut              : string;
    nombres_usuario  : string;
    apellidos_usuario: string;
    correo_usuario   : string;
    contrasena       : string;
    estado?          : boolean;  
    nombre_unidad?   : string;
    nombre_rol       : string;
}