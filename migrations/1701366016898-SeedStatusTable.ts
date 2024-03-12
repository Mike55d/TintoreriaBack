import { MigrationInterface, QueryRunner } from 'typeorm';

export const allPermissions =
  'clients:create,clients:delete,clients:read,clients:update,logs:read,roles:create,roles:delete,roles:read,roles:update,users:create,users:delete,users:read,users:update,ticket:read,ticket:update,ticket:delete,ticket:create,comments:delete';

export class SeedStatusTable1701366016898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`prioritys\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`types\`(id,description) VALUES (1,'Incidente'),(2,'Solicitud')`
    );
    await queryRunner.query(
      `INSERT INTO \`impacts\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`urgencys\`(id,description) VALUES (1,'Bajo'),(2,'Medio'),(3,'Alto'),(4,'Critico')`
    );
    await queryRunner.query(
      `INSERT INTO \`statuss\`(id,description) VALUES (1,'En espera'),(2,'Resuelto')`
    );
    await queryRunner.query(
      `INSERT INTO \`roles\`(name,permissions) VALUES ('admin','${allPermissions}'),('readOnly','${allPermissions}'),('tecnician','${allPermissions}'),('supervisor','${allPermissions}')`
    );
    await queryRunner.query(
      `INSERT INTO \`users\`(name,email,status) VALUES ('Development','development@adv-ic.com',1)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
