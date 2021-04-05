import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Comment1605202225035 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Comments',
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
                  name: 'share_id',
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
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Posts',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'comment_id',
                  columnNames: ['comment_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Comments',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
               },
               {
                  name: 'share_id',
                  columnNames: ['share_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Shares',
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
      await queryRunner.dropTable('Comments');
   }
}
