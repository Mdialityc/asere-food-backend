import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Province from './province.entity';
import Municipality from './municipality.entity';
import { InventoryEntry } from './inventory-entry.entity';
import Provider from './provider.entity';
import ProductCombo from './product_combo.entity';

@Entity({ name: 'zones' })
export default class Zone{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {length: 255})
  @Index({unique: true})
  name: string;

  @Column('character varying', {length: 255, nullable: true})
  description?: string

  @ManyToMany(() => Province, (province) => province.zones)
  provinces: Province[];

  @ManyToMany(() => Municipality, (municipality) => municipality.zones)
  municipalities: Municipality[];

  @OneToMany(() => InventoryEntry, (entry) => entry.zone)
  inventoryEntries: InventoryEntry[];

  @OneToMany(() => ProductCombo, (productCombo) => productCombo.zone)
  productCombos: ProductCombo[];
}