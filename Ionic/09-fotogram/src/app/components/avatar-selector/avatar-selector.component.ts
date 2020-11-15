import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-avatar-selector",
  templateUrl: "./avatar-selector.component.html",
  styleUrls: ["./avatar-selector.component.scss"],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSelec = new EventEmitter<string>();
  @Input() avatar: string = "av-1.png";

  avatars = [
    {
      img: "av-1.png",
      seleccionado: true,
    },
    {
      img: "av-2.png",
      seleccionado: false,
    },
    {
      img: "av-3.png",
      seleccionado: false,
    },
    {
      img: "av-4.png",
      seleccionado: false,
    },
    {
      img: "av-5.png",
      seleccionado: false,
    },
    {
      img: "av-6.png",
      seleccionado: false,
    },
    {
      img: "av-7.png",
      seleccionado: false,
    },
    {
      img: "av-8.png",
      seleccionado: false,
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  constructor() {}

  ngOnInit() {
    this.avatars.forEach((avatar) => (avatar.seleccionado = false));
    this.avatars.forEach((avatar) => {
      if (avatar.img === this.avatar) {
        avatar.seleccionado = true;
      }
    });
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach((avatar) => (avatar.seleccionado = false));
    avatar.seleccionado = true;
    this.avatarSelec.emit(avatar.img);
  }
}
