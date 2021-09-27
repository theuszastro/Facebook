import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Files1616409680140 implements MigrationInterface {
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
                  generationStrategy: 'uuid',
               },
               {
                  name: 'path',
                  type: 'varchar',
               },
               {
                  name: 'isVideo',
                  type: 'integer',
               },
               {
                  name: 'avatar_id',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'post_id',
                  type: 'varchar',
                  isNullable: true,
               },
            ],
            foreignKeys: [
               {
                  name: 'Avatar User',
                  columnNames: ['avatar_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'Post',
                  columnNames: ['post_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Posts',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
            ],
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Files');
   }
}
