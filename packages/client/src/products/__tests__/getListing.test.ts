import { getListing } from '../';
import {
  mockProductsListResponse,
  mockProductsListSlug,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getListing.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getListing', () => {
  const query = {};
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductsListResponse));

    expect.assertions(2);

    await expect(getListing(mockProductsListSlug, query)).resolves.toEqual(
      mockProductsListResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/listing${mockProductsListSlug}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getListing(mockProductsListSlug, query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/listing${mockProductsListSlug}`,
      expectedConfig,
    );
  });
});
