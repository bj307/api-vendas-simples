import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrdersProducts1688827360231
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ordersProducts',
      new TableColumn({
        name: 'orderId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ordersProducts',
      new TableForeignKey({
        name: 'AddOrderIdToOrdersProducts',
        columnNames: ['orderId'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ordersProducts',
      'AddOrderIdToOrdersProducts',
    );
    await queryRunner.dropColumn('ordersProducts', 'orderId');
  }
}
