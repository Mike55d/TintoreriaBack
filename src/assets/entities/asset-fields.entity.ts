import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssetTypes } from './asset.entity';

@Entity()
export class AssetFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AssetTypes, assetType => assetType.assetFields, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE'
  })
  AssetType: AssetTypes;
}
