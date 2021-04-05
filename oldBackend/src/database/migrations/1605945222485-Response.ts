import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Response1605945222485 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'CommentResponses',
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
                  name: 'content',
                  type: 'text'
               },
               {
                  name: 'edited',
                  type: 'integer'
               },
               {
                  name: 'user_id',
                  type: 'varchar'
               },
               {
                  name: 'comment_id',
                  type: 'varchar'
               },
               {
                  name: 'createdAt',
                  type: 'text'
               }
            ],
            foreignKeys: [

               {
                  name: 'comment_id',
                  columnNames: ['comment_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Comments',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'usuario_id',
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
      await queryRunner.dropTable('CommentResponses');
   }
}
