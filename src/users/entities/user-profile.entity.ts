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

  get json(): any {
    return {
      trustedDomains: this.trustedDomains,
      skipUntrustedRedirect: this.skipUntrustedRedirect,
      darkMode: this.darkMode
    };
  }
}
