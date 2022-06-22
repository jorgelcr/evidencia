import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-evidencias',
  templateUrl: './crear-evidencias.component.html',
  styleUrls: ['./crear-evidencias.component.css']
})
export class CrearEvidenciasComponent implements OnInit {

  
  constructor() { 
    function makeRandom(largoCadena: number, letra: string) {
      let text = "";
      for (let i = 0; i < largoCadena; i++) {
        text += letra.charAt(Math.floor(Math.random() * letra.length));
        if (i ===4 || i ===7) {
          let text1 ="-"
            text = text.concat(text1.toString());
            console.log(text," :el texto es: ")
            
        }
      }
      console.log("ssssss: ",text)
        return text;
    }
    let rangoLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const largoCadena = 10;
    makeRandom(largoCadena, rangoLetras);
    
  }

  ngOnInit(): void {
  }

}
