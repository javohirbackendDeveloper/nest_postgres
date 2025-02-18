import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createProduct(title: string, price: number): Promise<Product> {
    const product = this.productRepository.create({ title, price });
    return this.productRepository.save(product);
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // getProductById(id: number): Promise<Product> {
  //   return this.productRepository.findOne(id);
  // }

  // async updateProduct(
  //   id: number,
  //   title: string,
  //   price: number,
  // ): Promise<Product> {
  //   await this.productRepository.update(id, { title, price });
  //   return this.productRepository.findOne(id);
  // }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
