import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonUi } from "@shared/components/button-ui/button-ui";

@Component({
  selector: 'app-perufast-pro',
  imports: [ButtonUi],
  templateUrl: './perufast-pro.html',
  styleUrl: './perufast-pro.css',
})
export class PerufastPro {
  router = inject(Router)
  irPasos(){
    this.router.navigate(["/login"])
  }
}
