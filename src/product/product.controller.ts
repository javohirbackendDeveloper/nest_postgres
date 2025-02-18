import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: { title: string; price: number }): Promise<Product> {
    return this.productService.createProduct(body.title, body.price);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Product> {
  //   return this.productService.getProductById(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() body: { title: string; price: number },
  // ): Promise<Product> {
  //   return this.productService.updateProduct(id, body.title, body.price);
  // }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
