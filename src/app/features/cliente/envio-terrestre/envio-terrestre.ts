import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonUi } from "@shared/components/button-ui/button-ui";
@Component({
  selector: 'app-envio-terrestre',
  imports: [ButtonUi],
  templateUrl: './envio-terrestre.html',
  styleUrl: './envio-terrestre.css',
})
export class EnvioTerrestre {
  router = inject(Router)

  irPasos(){
    this.router.navigate(["/terrestre/pasos"])
  }
}
