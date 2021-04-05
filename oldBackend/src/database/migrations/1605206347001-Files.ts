import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PostFile1605206347001 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Files',
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
                  name: 'isVideo',
                  type: 'integer'
               },
               {
                  name: 'path',
                  type: 'text'
               },
               {
                  name: 'post_id',
                  type: 'varchar',
                  isNullable: true
               },
               {
                  name: 'comment_id',
                  type: 'varchar',
                  isNullable: true
               },
               {
                  name: 'response_id',
                  type: 'varchar',
                  isNullable: true
               },
               {
                  name: 'cover_id',
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
                  name: 'post_id',
                  columnNames: ['post_id'],
                  referencedTableName: 'Posts',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'comment_id',
                  columnNames: ['comment_id'],
                  referencedTableName: 'Comments',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'response_id',
                  columnNames: ['response_id'],
                  referencedTableName: 'CommentResponses',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'cover_id',
                  columnNames: ['cover_id'],
                  referencedTableName: 'Covers',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Files');
   }
}
