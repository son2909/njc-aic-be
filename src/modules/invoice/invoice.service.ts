import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/base.service';
import { Invoice } from './invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: InvoiceRepository,
  ) {
    super(invoiceRepository);
  }
}
