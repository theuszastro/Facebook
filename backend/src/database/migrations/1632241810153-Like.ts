import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Like1632241810153 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Likes',
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
                  name: 'reaction',
                  type: 'varchar',
               },
               {
                  name: 'post_id',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'user_id',
                  type: 'varchar',
               },
               {
                  name: 'createdAt',
                  type: 'varchar',
               },
            ],
            foreignKeys: [
               {
                  name: 'post id likes',
                  columnNames: ['post_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Posts',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'user id likes',
                  columnNames: ['user_id'],
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
      await queryRunner.dropTable('Likes');
   }
}
