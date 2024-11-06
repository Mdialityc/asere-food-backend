import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category.entity';
import Provider from './provider.entity';
import { InventoryEntry } from './inventory-entry.entity';
import ProductCombo from './product_combo.entity';
import ProductComboItem from './product-combo-item.entity';

@Entity({ name: 'products' })
export default class Product{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {length: 255})
  @Index({unique: true})
  name: string;

  @Column('character varying', {length: 255})
  shortDescription: string;

  @Column({nullable: true})
  description?: string;

  @Column('boolean')
  isService: boolean;

  @ManyToOne(() => Category, (category) => category.products, {onDelete: 'CASCADE'})
  category: Category;

  @ManyToMany(() => Provider, (provider) => provider.products)
  providers: Provider[];

  @OneToMany(() => InventoryEntry, (entry) => entry.product)
  inventoryEntries: InventoryEntry[];

  @OneToMany(() => ProductComboItem, (productComboItem) => productComboItem.product)
  productComboItems: ProductComboItem[];

}