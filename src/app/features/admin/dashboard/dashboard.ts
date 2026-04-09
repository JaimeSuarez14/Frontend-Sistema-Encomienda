import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

interface DashboardMenuItem {
  label: string;
  subtitle: string;
  icon: string;
  active?: boolean;
  ruta: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isMenuOpen = false;

  readonly menuItems: DashboardMenuItem[] = [
    {
      label: 'Dashboard',
      subtitle: 'Vista general',
      icon: 'bi bi-grid',
      active: true,
      ruta: '',
    },
    {
      label: 'Encomiendas',
      subtitle: 'Gestión de pedidos',
      icon: 'bi bi-box-seam',
      ruta: '/dashboard/encomiendas',
    },
    {
      label: 'Rutas',
      subtitle: 'Seguimiento y mapas',
      icon: 'bi bi-signpost-split',
      ruta: '',
    },
    {
      label: 'Clientes',
      subtitle: 'Base de clientes',
      icon: 'bi bi-people',
      ruta: '',
    },
    {
      label: 'Reportes',
      subtitle: 'Indicadores y métricas',
      icon: 'bi bi-graph-up-arrow',
      ruta: '',
    },
    {
      label: 'Configuración',
      subtitle: 'Ajustes del sistema',
      icon: 'bi bi-gear',
      ruta: '',
    },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
