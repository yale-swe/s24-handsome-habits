const { createUser, findUser, deleteUser } = require('../src/db/user_db_operations.js');
const User = require('../src/db/models/user.js');

jest.mock('../src/db/models/user.js', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  }));

// Reset all mocks before each test


beforeEach(() => {
    jest.clearAllMocks();
  });

describe('User Database Operations - Mocked', () => {

  it('successfully creates a new user', async () => {
    // Mock the implementation of User.create
    User.create.mockResolvedValue({
      _id: 'mockId',
      username: 'testuser',
      email: 'test@example.com',
    });

    const user = await createUser({ username: 'testuser', email: 'test@example.com' });
    expect(user).toHaveProperty('_id', 'mockId');
    expect(User.create).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com' });
  });

  it('finds a user by username', async () => {
    // Mock the implementation of User.findOne
    User.findOne.mockResolvedValue({
      username: 'finduser',
      email: 'finduser@example.com',
    });

    const user = await findUser('finduser');
    expect(user).toHaveProperty('username', 'finduser');
    expect(User.findOne).toHaveBeenCalledWith({ username: 'finduser' });
  });

  it('deletes a user by username', async () => {
    // Mock the implementation of User.deleteOne
    User.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await deleteUser('deleteuser');
    expect(result).toHaveProperty('deletedCount', 1);
    expect(User.deleteOne).toHaveBeenCalledWith({ username: 'deleteuser' });
  });
});
