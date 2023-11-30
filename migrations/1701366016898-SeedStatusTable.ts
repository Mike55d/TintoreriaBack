import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStatusTable1701366016898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`prioritys\`(description) VALUES ('Baja'),('Media'),('Alta')`
    );
    await queryRunner.query(
      `INSERT INTO \`types\`(description) VALUES ('Incidente'),('Solicitud')`
    );
    await queryRunner.query(
      `INSERT INTO \`impacts\`(description) VALUES ('Bajo'),('Medio'),('Alto'),('Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`urgencys\`(description) VALUES ('Baja'),('Media'),('Alta')`
    );
    await queryRunner.query(
      `INSERT INTO \`statuss\`(description) VALUES ('En espera'),('En proceso'),('Cerrado'),('Completado'),('Cancelado')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
