import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrdersProducts1688827737347
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ordersProducts',
      new TableColumn({
        name: 'productId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ordersProducts',
      new TableForeignKey({
        name: 'AddProductIdToOrdersProducts',
        columnNames: ['productId'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ordersProducts',
      'AddProductIdToOrdersProducts',
    );
    await queryRunner.dropColumn('ordersProducts', 'productId');
  }
}
