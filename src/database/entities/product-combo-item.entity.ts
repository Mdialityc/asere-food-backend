import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ProductCombo from './product_combo.entity';
import Product from './product.entity';

@Entity({ name: 'product_combo_items' })
export default class ProductComboItem{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductCombo, productCombo => productCombo.productComboItems)
  productCombo: ProductCombo;

  @Column('int')
  amount: number;

  @ManyToOne(() => Product, (product) => product.productComboItems)
  product: Product;
}