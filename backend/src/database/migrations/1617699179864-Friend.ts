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
                  name: 'friend_from_id',
                  type: 'varchar',
               },
               {
                  name: 'friend_to_id',
                  type: 'varchar',
               },
               {
                  name: 'createdAt',
                  type: 'varchar',
               },
            ],
            foreignKeys: [
               {
                  name: 'from user friend',
                  columnNames: ['friend_from_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'to user friend',
                  columnNames: ['friend_to_id'],
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
