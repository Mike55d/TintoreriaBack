import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssetTypes } from '../../assets/entities/asset.entity';
import { Client } from '../../clients/entities/clients.entity';

@Entity()
export class ClientAsset {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AssetTypes)
  assetType: AssetTypes;

  @Column()
  name: string;

  @Column({ nullable: true })
  ip?: string;

  @ManyToOne(() => Client, client => client.clientAssets, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE'
  })
  client: Client;
}
