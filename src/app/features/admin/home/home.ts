import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type DashboardStatus = 'Entregado' | 'En tránsito' | 'Pendiente';

interface QuickAction {
  label: string;
  description: string;
  icon: string;
}

interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

interface DashboardOrder {
  id: string;
  customer: string;
  destination: string;
  status: DashboardStatus;
  total: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly currentYear = new Date().getFullYear();

  readonly metrics: DashboardMetric[] = [
    {
      label: 'Encomiendas hoy',
      value: '142',
      trend: '+12.5% vs ayer',
      trendUp: true,
    },
    {
      label: 'Entregas completadas',
      value: '98',
      trend: '+8.1% semanal',
      trendUp: true,
    },
    {
      label: 'Pendientes',
      value: '31',
      trend: '-4.3% semanal',
      trendUp: true,
    },
    {
      label: 'Incidencias',
      value: '7',
      trend: '+2 reportes',
      trendUp: false,
    },
  ];

  readonly recentOrders: DashboardOrder[] = [
    {
      id: '#ENC-1023',
      customer: 'María Gómez',
      destination: 'Lima Centro',
      status: 'En tránsito',
      total: 'S/ 42.00',
    },
    {
      id: '#ENC-1022',
      customer: 'Carlos Ruiz',
      destination: 'Miraflores',
      status: 'Entregado',
      total: 'S/ 55.00',
    },
    {
      id: '#ENC-1021',
      customer: 'Paola Mendoza',
      destination: 'San Isidro',
      status: 'Pendiente',
      total: 'S/ 35.00',
    },
    {
      id: '#ENC-1019',
      customer: 'Jorge Vela',
      destination: 'Surco',
      status: 'Entregado',
      total: 'S/ 48.00',
    },
  ];

  getStatusClasses(status: DashboardStatus): string {
    if (status === 'Entregado') {
      return 'bg-emerald-100 text-emerald-700';
    }

    if (status === 'En tránsito') {
      return 'bg-blue-100 text-blue-700';
    }

    return 'bg-amber-100 text-amber-700';
  }

  readonly quickActions: QuickAction[] = [
    {
      label: 'Registrar encomienda',
      description: 'Crear un nuevo envío',
      icon: 'bi bi-plus-lg',
    },
    {
      label: 'Asignar repartidor',
      description: 'Distribuir rutas activas',
      icon: 'bi bi-person-check',
    },
    {
      label: 'Exportar reporte',
      description: 'Descargar resumen diario',
      icon: 'bi bi-file-earmark-arrow-down',
    },
  ];
}
