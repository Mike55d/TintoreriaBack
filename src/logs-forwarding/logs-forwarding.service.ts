import { Injectable } from '@nestjs/common';
import { CreateLogsForwardingDto } from './dto/create-logs-forwarding.dto';
import { UpdateLogsForwardingDto } from './dto/update-logs-forwarding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsForwarding } from './entities/logs-forwarding.entity';
import { Interval } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
var syslog = require('syslog-client');

@Injectable()
export class LogsForwardingService {
  constructor(
    @InjectRepository(LogsForwarding)
    private logsForwardingRepository: Repository<LogsForwarding>
  ) {}

  async create(createLogsForwardingDto: CreateLogsForwardingDto) {
    const logsForwarding = await this.logsForwardingRepository.findOneBy({});
    if (logsForwarding) {
      try {
        return await this.logsForwardingRepository.update(
          logsForwarding.id,
          createLogsForwardingDto
        );
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const newLogForwarding = this.logsForwardingRepository.create(createLogsForwardingDto);
      return await this.logsForwardingRepository.save(newLogForwarding);
    } catch (error) {
      console.log(error);
    }
  }

  async toggleActive() {
    const logsForwarding = await this.logsForwardingRepository.findOneBy({});
    if (logsForwarding) {
      try {
        return await this.logsForwardingRepository.update(logsForwarding.id, {
          active: !logsForwarding.active
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async findAll() {
    try {
      const logsForwarding = await this.logsForwardingRepository.findOneBy({});
      return logsForwarding?.json;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} logsForwarding`;
  }

  update(id: number, updateLogsForwardingDto: UpdateLogsForwardingDto) {
    return `This action updates a #${id} logsForwarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} logsForwarding`;
  }

  convertToCef(jsonData: any, logsForwarding: LogsForwarding): string {
    const cefVersion = '0'; // Versión de CEF
    const deviceVendor = 'YourDeviceVendor'; // Proveedor del dispositivo
    const deviceProduct = 'YourDeviceProduct'; // Producto del dispositivo
    const deviceVersion = '1.0'; // Versión del dispositivo
    const signatureId = '1234'; // ID del evento
    const name = 'Api request'; // Nombre del evento
    const severity = logsForwarding.severity; // Severidad del evento (0-10)

    const cefHeader = `CEF:${cefVersion}|${deviceVendor}|${deviceProduct}|${deviceVersion}|${signatureId}|${name}|${severity}`;
    const cefBody = this.jsonToCefAttributes(jsonData);

    return `${cefHeader} ${cefBody}`;
  }

  private jsonToCefAttributes(jsonData: any): string {
    const attributes = [];
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        const value = jsonData[key];
        attributes.push(`${key}=${value}`);
      }
    }
    return attributes.join(' ');
  }

  async forwardLog(message: any) {
    const logsForwarding = await this.logsForwardingRepository.findOneBy({});
    if (!logsForwarding || !logsForwarding?.active) return;
    if (logsForwarding.type == 0) {
      var options = {
        syslogHostname: logsForwarding.domain,
        transport: logsForwarding.protocol == 'TCP' ? 1 : 2,
        port: logsForwarding.port
      };

      var client = syslog.createClient(logsForwarding.domain, options);
      client.on('error', function (error) {
        console.error(error);
      });
      var optionsLog = {
        facility: logsForwarding.facility,
        severity: logsForwarding.severity
      };
      const formatMessage =
        logsForwarding.format == 'CEF' ? this.convertToCef(message, logsForwarding) : message;
      client.log(formatMessage, optionsLog, function (error) {
        if (error) {
          // console.error(error);
        } else {
          console.log('sent message successfully');
        }
      });
    } else {
      const method = logsForwarding.method.toLowerCase();
      try {
        let payload = {};
        let formatHeaders = { 'Content-Type': logsForwarding.content_type };
        let fields = JSON.parse(logsForwarding.fields);
        let headers = JSON.parse(logsForwarding.headers);
        fields.forEach(field => {
          payload[field.key] = field.value.replace('{{log}}', message);
        });
        // console.log(payload);
        headers.forEach(header => {
          formatHeaders[header.key] = header.value;
        });
        const responseLogForward = await axios[method](
          logsForwarding.url,
          logsForwarding.content_type == 'application/json'
            ? JSON.parse(logsForwarding.body.replace('{{log}}', message))
            : payload,
          {
            headers: formatHeaders
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  // @Interval(60000)
  testLog(id: number) {
    var options = {
      syslogHostname: 'gupidev.com',
      transport: syslog.Transport.Udp,
      port: 514
    };

    var client = syslog.createClient('127.0.0.1', options);

    client.on('error', function (error) {
      console.error(error);
    });

    var optionsLog = {
      facility: 4,
      severity: 0
    };
    var message = 'something is wrong with this daemon!';
    client.log(message, optionsLog, function (error) {
      if (error) {
        console.error(error);
      } else {
        console.log('sent message successfully');
      }
    });

    return `test syslog`;
  }
}
