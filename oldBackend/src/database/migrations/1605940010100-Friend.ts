import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Friend1605940010100 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Amigos',
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
                  name: 'friend_id',
                  type: 'varchar'
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
                  name: 'usuário_id',
                  columnNames: ['user_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
               {
                  name: 'friend_id',
                  columnNames: ['friend_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'Users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               }
            ]
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Amigos');
   }
}
