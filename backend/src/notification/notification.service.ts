import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly gateway: NotificationGateway) {}

  sendHeadcountUpdate(count: number) {
    this.gateway.broadcast('headcountUpdate', { count });
  }

  sendLectureNotification(message: string) {
    this.gateway.broadcast('lectureNotification', { message });
  }
}
