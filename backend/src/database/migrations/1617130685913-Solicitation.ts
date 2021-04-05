import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Solicitation1617130685913 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Solicitations',
            columns: [
               {
                  name: 'id',
                  type: 'varchar',
                  unsigned: true,
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'uuid',
               },
               {
                  name: 'from_id',
                  type: 'varchar',
               },
               {
                  name: 'to_id',
                  type: 'varchar',
               },
               {
                  name: 'status',
                  type: 'varchar',
               },
               {
                  name: 'createdAt',
                  type: 'varchar',
               },
            ],
            foreignKeys: [
               {
                  name: 'From user',
                  columnNames: ['from_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'To user',
                  columnNames: ['to_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
            ],
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Solicitations');
   }
}
