import { Component, Input, OnInit, ViewChild } from "@angular/core";

declare var mapboxgl: any;

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.scss"],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild("mapa", { static: true }) mapa;

  constructor() {}

  ngOnInit() {
    const latlong = this.coords.split(",");
    const lat = Number(latlong[0]);
    const lon = Number(latlong[1]);

    console.log(this.mapa);

    mapboxgl.accessToken =
      "pk.eyJ1Ijoic29sYXJlc2JyeWFuIiwiYSI6ImNraDcxZTIyYTA3OGYyem1tb21ndjhndDEifQ.HrpNdkn1eK8cv5ZKRtXOxQ";
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
  }
}
