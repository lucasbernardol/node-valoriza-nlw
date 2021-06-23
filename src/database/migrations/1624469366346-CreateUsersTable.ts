import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1624469366346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
          },

          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
