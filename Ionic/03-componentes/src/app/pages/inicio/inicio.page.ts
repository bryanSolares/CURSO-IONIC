import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Componente } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>;

  constructor(private menuController: MenuController, private dataService: DataService) {}

  ngOnInit() {
    this.componentes = this.dataService.getMenuOptions();
  }

  toggleMenu(){
    this.menuController.toggle();
  }
}

