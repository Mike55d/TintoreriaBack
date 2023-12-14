import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssetTypes } from '../../assets/entities/asset.entity';

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
}
