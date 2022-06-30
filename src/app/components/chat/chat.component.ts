import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MensajeChat } from '../../modelos/mensaje-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajes: MensajeChat[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

    this.chatService.escucharMensajes((mensaje: MensajeChat) => {

      // evita que se muestren mensajes vacíos
      if(!mensaje.mensaje) {
        return;
      }
      const fechaActual = new Date();

      let minutos = fechaActual.getMinutes().toString();
      if(minutos.length === 1) {
        minutos = '0' + minutos;
      }

      mensaje.hora = `${fechaActual.getHours()}:${minutos}`;

      this.mensajes.push(mensaje);
    });
  }

  onMensaje(mensajeInput: HTMLInputElement) {

    const mensaje = mensajeInput.value;

    if(!mensaje) {
      return;
    }

    const mensajeChat: MensajeChat = {
      usuario: 'Marina ',
      mensaje,
    }

    // envía el mensaje al servicio websocket
    this.chatService.enviar(mensajeChat);
    mensajeInput.value = ''; // borra el contenido el input del mensaje
  }

  onEnviarMensaje(
    event: KeyboardEvent,
    mensajeInput: HTMLInputElement
  ) {

    // el usuario ha pulsado Enter en la caja de texto del password. Ahora ejecutamos el mismo código del método loginGestor
    if(event.key === 'Enter') {
      this.onMensaje(mensajeInput);
    }
  }

  onBorrar() {
    this.mensajes = [];
  }
}