import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface DashboardMenuItem {
  label: string;
  subtitle: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet],
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
    },
    {
      label: 'Encomiendas',
      subtitle: 'Gestión de pedidos',
      icon: 'bi bi-box-seam',
    },
    {
      label: 'Rutas',
      subtitle: 'Seguimiento y mapas',
      icon: 'bi bi-signpost-split',
    },
    {
      label: 'Clientes',
      subtitle: 'Base de clientes',
      icon: 'bi bi-people',
    },
    {
      label: 'Reportes',
      subtitle: 'Indicadores y métricas',
      icon: 'bi bi-graph-up-arrow',
    },
    {
      label: 'Configuración',
      subtitle: 'Ajustes del sistema',
      icon: 'bi bi-gear',
    },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
