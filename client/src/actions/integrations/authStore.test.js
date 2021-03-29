import moxios from 'moxios';
import { storeFactory } from '../../tests/testUtils';
import { signIn } from '../authAction';

//integration test for async function by that mage requests to the server
const mockCallBack = jest.fn();
describe('signup', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('secretWord is returned', () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    return store.dispatch(signIn({}, mockCallBack))
      .then(() => {
        expect(mockCallBack).toBeCalledWith('party');
      });
  });
});



