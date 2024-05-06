import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { ClientAsset } from '../../client-asset/entities/client-asset.entity';
import { DistributionList } from '../../distribution-lists/entities/distributionList.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @Column({ length: 20, nullable: true })
  dni: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  contactName: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ length: 100, nullable: true })
  trademark: string;

  @CreateDateColumn()
  regDate: Date;

  @UpdateDateColumn()
  lastUpdate: Date;

  @Column({ nullable: true })
  sender_email: string;

  @OneToMany(() => ClientAsset, clientAsset => clientAsset.client, { cascade: true })
  clientAssets: ClientAsset[];

  @Column({ nullable: true })
  domain: string;

  @Column({ nullable: true })
  emails?: string;

  @Column({ nullable: true })
  glpiId?: number;

  @OneToMany(() => DistributionList, distributionLists => distributionLists.client)
  distributionLists: DistributionList[];

  get json() {
    return {
      id: this.id,
      dni: this.dni,
      name: this.name,
      status: this.status,
      country: this.country,
      phone: this.phone,
      address: this.address,
      email: this.email,
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      notes: this.notes,
      trademark: this.trademark,
      regDate: this.regDate,
      clientAssets: this.clientAssets.map(asset => ({ ...asset, assetType: asset.assetType.id })),
      domain: this.domain,
      emails: this.emails?.split(','),
      glpiId: this.glpiId,
      distributionLists: this.distributionLists
    };
  }
}
