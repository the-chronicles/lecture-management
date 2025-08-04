import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(
    private config: ConfigService,
    private notificationService: NotificationService,
  ) {}

  onModuleInit() {
    const brokerUrl = this.config.get<string>('MQTT_BROKER_URL');
    this.client = mqtt.connect(brokerUrl!);

    this.client.on('connect', () => {
      console.log('✅ Connected to MQTT Broker');
      this.client.subscribe('lecture/hall/headcount');
      this.client.subscribe('lecture/notifications');
    });

    this.client.on('message', (topic, payload) => {
      const message = payload.toString();
      if (topic === 'lecture/hall/headcount') {
        const count = parseInt(message);
        this.notificationService.sendHeadcountUpdate(count);
      }
      if (topic === 'lecture/notifications') {
        this.notificationService.sendLectureNotification(message);
      }
    });
  }
}
