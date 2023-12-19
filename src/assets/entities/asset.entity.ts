import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetFields } from './asset-fields.entity';

@Entity()
export class AssetTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AssetFields, assetFields => assetFields.AssetType, { cascade: true })
  assetFields: AssetFields[];
}
