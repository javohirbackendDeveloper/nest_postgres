import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const mockProductService = {
      createProduct: jest.fn(),
      getAllProducts: jest.fn(),
      deleteProduct: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService, // ProductService mock taqdim etiladi
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = { title: 'Test Product', price: 100 };
    const result = { id: 1, ...createProductDto };

    jest
      .spyOn(productService, 'createProduct')
      .mockResolvedValue(result as any);

    expect(await controller.create(createProductDto)).toEqual(result);
  });

  it('should return all products', async () => {
    const products = [{ id: 1, title: 'Test Product', price: 100 }];
    jest
      .spyOn(productService, 'getAllProducts')
      .mockResolvedValue(products as any);

    expect(await controller.findAll()).toEqual(products);
  });

  it('should delete a product', async () => {
    jest.spyOn(productService, 'deleteProduct').mockResolvedValue(undefined);

    await expect(controller.delete(1)).resolves.not.toThrow();
  });
});
