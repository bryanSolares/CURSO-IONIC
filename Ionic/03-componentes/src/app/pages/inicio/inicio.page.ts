import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirecTo: '/action-sheet',
    },
    {
      icon: 'logo-apple-appstore',
      name: 'Alert',
      redirecTo: '/alert',
    },
    {
      icon: 'beaker',
      name: 'Avatar',
      redirecTo: '/avatar',
    },
    {
      icon: 'radio-button-on',
      name: 'Button',
      redirecTo: '/button',
    },
    {
      icon: 'card',
      name: 'Cards',
      redirecTo: '/card',
    },
    {
      icon: 'checkmark-circle-outline',
      name: 'Checkbox',
      redirecTo: '/checkbox',
    },
    {
      icon: 'calendar',
      name: 'Date Time',
      redirecTo: '/date-time',
    },
    {
      icon: 'car',
      name: 'Fabicon',
      redirecTo: '/fab',
    },
    {
      icon: 'grid',
      name: 'Grid Rows',
      redirecTo: '/grid',
    },
    {
      icon: 'infinite',
      name: 'Infinite Scroll',
      redirecTo: '/infinite-scroll',
    },
    {
      icon: 'hammer',
      name: 'Input Forms',
      redirecTo: '/input',
    },
    {
      icon: 'list',
      name: 'Listas - Sliding',
      redirecTo: '/list',
    }
  ];

  constructor() {}

  ngOnInit() {}
}

interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
}
