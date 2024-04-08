import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  trustedDomains: string[];

  @Column({ default: false })
  skipUntrustedRedirect: boolean;

  @Column({ default: false })
  darkMode: boolean;

  @Column({
    default: 'title,description,client,openingDate,priority,type,status,history'
  })
  columns: string;

  @Column({ default: 10 })
  take: number;

  @Column({ type: 'longtext', nullable: true })
  signature: string;

  @Column({ type: 'longtext', nullable: true })
  filters?: string;

  get json(): any {
    return {
      trustedDomains: this.trustedDomains,
      skipUntrustedRedirect: this.skipUntrustedRedirect,
      darkMode: this.darkMode,
      columns: this.columns.split(','),
      take: this.take,
      signature: this.signature,
      filters: this.filters
    };
  }
}
