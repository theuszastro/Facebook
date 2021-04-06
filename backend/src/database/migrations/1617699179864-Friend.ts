import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Friend1617699179864 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Friends',
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
                  name: 'createdAt',
                  type: 'varchar',
               },
            ],
            foreignKeys: [
               {
                  name: 'from user',
                  columnNames: ['from_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'to user',
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

   public async down(queryRunner: QueryRunner): Promise<void> {}
}
