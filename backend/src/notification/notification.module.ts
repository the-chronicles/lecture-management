import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MqttService } from './mqtt.service';

@Module({
  providers: [NotificationService, NotificationGateway, MqttService],
  exports: [NotificationService], // export for other modules
})
export class NotificationModule {}
