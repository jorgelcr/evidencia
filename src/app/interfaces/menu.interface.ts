export interface MenuItem {
    titulo: string ;
    ruta: string ;
    icono: string ;
}

export interface MenuItem2 {
    titulo?: string ;
    icono?: string ;
    subtitulo?: string ;
    subruta: string ;
    subicono?: string ;
}

export interface MenuItem3 {
    titulo?: string ;
    ruta: string ;
    icono?: string ;
}

export interface MenuItemFinal {
    titulo?: string ;
    ruta?: string ;
    icono?: string ;
    submenu?: [{
        titulo?: string;
    }]
    }

