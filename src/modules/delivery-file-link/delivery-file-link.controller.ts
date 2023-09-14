import { Controller } from '@nestjs/common';
import { DeliveryFileLinkService } from './delivery-file-link.service';

@Controller('delivery-file-link')
export class DeliveryFileLinkController {
  constructor(
    private readonly deliveryFileLinkService: DeliveryFileLinkService,
  ) {}
}
