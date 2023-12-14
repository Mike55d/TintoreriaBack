import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStatusTable1701366016898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`prioritys\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`types\`(description) VALUES ('Incidente'),('Solicitud')`
    );
    await queryRunner.query(
      `INSERT INTO \`impacts\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`urgencys\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`statuss\`(description) VALUES ('En espera'),('Resuelto')`
    );
    await queryRunner.query(
      `INSERT INTO \`asset_typess\`(name) VALUES ('Firewall'),('Servidor'),('Antivirus')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
