// src/Presentation/Customers/customers.controller.ts
@Post()
async save(@Body() dto: CustomersDto) {
  try {
    const customerData: CreateCustomerDto = {
      cpf: dto.cpf,
      name: dto.name,
      password: dto.password,
    };
    const customer = await this.customerService.create(customerData);
    return customer;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new NotFoundException(err.message ?? 'Customer could not be created');
    }
    throw new NotFoundException('Customer could not be created');
  }
}
