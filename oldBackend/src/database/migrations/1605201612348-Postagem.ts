import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Postagem1605201612348 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Posts',
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
                  name: 'description',
                  type: 'text'
               },
               {
                  name: 'edited',
                  type: 'integer'
               },
               {
                  name: 'media_grid',
                  type: 'varchar',
               },
               {
                  name: 'user_id',
                  type: 'varchar'
               },
               {
                  name: 'shortTime',
                  type: 'varchar',
                  isNullable: true
               },
               {
                  name: 'time',
                  type: 'varchar',
                  isNullable: true
               },
               {
                  name: 'createdAt',
                  type: 'text'
               }
            ],
            foreignKeys: [
               {
                  name: 'createdBy',
                  columnNames: ['user_id'],
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
      await queryRunner.dropTable('Posts');
   }
}
