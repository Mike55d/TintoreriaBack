import { PartialType } from '@nestjs/swagger';
import { CreateLogsForwardingDto } from './create-logs-forwarding.dto';

export class UpdateLogsForwardingDto extends PartialType(CreateLogsForwardingDto) {}
