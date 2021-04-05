import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class HistoricSearch1615060909876 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'HistoricSearch',
            columns: [
               {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  unsigned: true,
                  isGenerated: true,
                  generationStrategy: 'uuid'
               },
               {
                  name: 'search',
                  type: 'varchar'
               },
               {
                  name: 'searchedUser_id',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'user_id',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'isGlobal',
                  type: 'integer'
               },
               {
                  name: 'createdAt',
                  type: 'varchar'
               },
            ],
            foreignKeys: [
               {
                  name: 'user',
                  columnNames: ['user_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'userSearched',
                  columnNames: ['searchedUser_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('HistoricSearch');
   }
}
