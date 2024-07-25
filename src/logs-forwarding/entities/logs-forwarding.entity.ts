import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogsForwarding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({ nullable: true })
  domain: string;

  @Column({ nullable: true })
  protocol: string;

  @Column({ nullable: true })
  port: string;

  @Column({ nullable: true })
  severity: number;

  @Column({ nullable: true })
  facility: number;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  content_type: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  fields: string;

  @Column({ nullable: true })
  headers: string;

  get json() {
    return {
      id: this.id,
      type: this.type,
      domain: this.domain,
      protocol: this.protocol,
      port: this.port,
      severity: this.severity,
      facility: this.facility,
      format: this.format,
      url: this.url,
      method: this.method,
      content_type: this.content_type,
      body: this.body,
      fields: JSON.parse(this.fields),
      headers: this.headers
    };
  }
}
