export class Usuario{

    constructor(

        public id_usuarios     : string,
        public rut  : string,
        public nombres_usuario  : string,
        public correo_usuario   : string,
        

        
        public apellidos_usuario?: string,

        public contrasena?       : string,
        public estado?           : string,
    ){}

    imprimirUsuario() {
        console.log(this.id_usuarios, this.rut, this.correo_usuario, this.nombres_usuario)
    }
}