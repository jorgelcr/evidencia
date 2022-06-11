import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class booleanPipe implements PipeTransform {

   transform(valor: any): string {
     
    return (valor)
        ? 'Activo'
        : 'Inactivo';
   }
}
