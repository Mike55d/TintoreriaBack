import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGlpi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_glpi: number;

  @Column()
  email: string;
}
