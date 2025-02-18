import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const mockProductRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product), // ProductRepositoryni mock qilish
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = { id: 1, title: 'Test Product', price: 100 };
    jest.spyOn(productRepository, 'save').mockResolvedValue(product as any);

    const result = await service.createProduct('Test Product', 100);
    expect(result).toEqual(product);
  });

  it('should return all products', async () => {
    const products = [{ id: 1, title: 'Test Product', price: 100 }];
    jest.spyOn(productRepository, 'find').mockResolvedValue(products as any);

    const result = await service.getAllProducts();
    expect(result).toEqual(products);
  });

  it('should delete a product', async () => {
    // jest.spyOn(productRepository, 'delete').mockResolvedValue({ affected: 1 });

    await expect(service.deleteProduct(1)).resolves.not.toThrow();
  });
});
