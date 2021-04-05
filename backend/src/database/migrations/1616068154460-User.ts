import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1616068154460 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'Users',
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
                  name: 'firstname',
                  type: 'varchar',
               },
               {
                  name: 'lastname',
                  type: 'varchar',
               },
               {
                  name: 'email',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'phone',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'password',
                  type: 'varchar',
               },
               {
                  name: 'sex',
                  type: 'varchar',
               },
               {
                  name: 'pronoun',
                  type: 'varchar',
               },
               {
                  name: 'date_birth',
                  type: 'varchar',
               },
               {
                  name: 'online',
                  type: 'integer',
               },
               {
                  name: 'theme',
                  type: 'varchar',
               },
               {
                  name: 'office',
                  type: 'varchar',
               },
               {
                  name: 'updatedAt',
                  type: 'varchar',
               },
               {
                  name: 'createdAt',
                  type: 'varchar',
               },
            ],
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Users');
   }
}
