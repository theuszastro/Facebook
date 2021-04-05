import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Solicitations1606030158860 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Solicitações',
            columns: [
               {
                  name: 'id',
                  type: 'varchar',
                  unsigned: true,
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'uuid'
               },
               {
                  name: 'status',
                  type: 'varchar'
               },
               {
                  name: 'to_id',
                  type: 'varchar'
               },
               {
                  name: 'from_id',
                  type: 'varchar'
               },
               {
                  name: 'createdAt',
                  type: 'varchar'
               }
            ],
            foreignKeys: [
               {
                  name: 'rement_id',
                  columnNames: ['from_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'received_id',
                  columnNames: ['to_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               }
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Solicitações');
   }
}
