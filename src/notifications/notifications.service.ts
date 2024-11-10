import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationService {
  private readonly HUB_NAME = 'gdr-upb';
  private readonly CONNECTION_STRING = 'Endpoint=sb://GestionDeRiesgosUPB-Hubs.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=kwL98RaQTwD6PoaUSvzw7yrYdqpqI3tmO+99kOqTHH8=';
  private readonly FCM_ENDPOINT = `https://${this.HUB_NAME}.servicebus.windows.net/${this.HUB_NAME}/messages`;

  async enviarAlertaGlobal(mensaje: string, titulo: string) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `SharedAccessSignature ${this.CONNECTION_STRING}`,
      'ServiceBusNotification-Format': 'gcm',
    };

    const data = {
      notification: {
        title: titulo,
        body: mensaje,
        color: '#FF0000',
        priority: 'high',
        sound: 'default',
      },
      data: {
        tipo: 'emergencia_global',
      },
    };

    await axios.post(this.FCM_ENDPOINT, data, { headers });
  }
}