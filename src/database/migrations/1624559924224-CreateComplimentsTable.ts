import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateComplimentsTable1624559924224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compliments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'senderId',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'receiverId',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'tagId',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'message',
            type: 'varchar',
            isNullable: false,
            length: '255',
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
        foreignKeys: [
          {
            name: 'fk_compliments_user_sender',
            columnNames: ['senderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },

          {
            name: 'fk_compliments_user_receiver',
            columnNames: ['receiverId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },

          {
            name: 'fk_compliments_tag',
            columnNames: ['tagId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }
}
