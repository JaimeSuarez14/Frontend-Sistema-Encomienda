import { Component } from '@angular/core';
import { ButtonUi } from "@shared/components/button-ui/button-ui";
import { SidebarGeneric } from "@shared/components/sidebar-generic/sidebar-generic";
@Component({
  selector: 'app-envio-terrestre',
  imports: [ButtonUi, SidebarGeneric],
  templateUrl: './envio-terrestre.html',
  styleUrl: './envio-terrestre.css',
})
export class EnvioTerrestre {

}
