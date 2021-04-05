import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Avatars1605207929069 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Avatars',
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
                  name: 'path',
                  type: 'text'
               },
               {
                  name: 'user_id',
                  type: 'varchar'
               },
               {
                  name: 'createdAt',
                  type: 'text'
               }
            ],
            foreignKeys: [
               {
                  name: 'uploadedBy',
                  columnNames: ['user_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               }
            ]
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Avatars');
   }
}
