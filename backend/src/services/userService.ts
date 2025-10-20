import { User } from '../db/models/user';

export const listUsers = async () => {
  const users = await User.find({});

  return users;
};

export const createUser = async ({
  username,
  fullName,
  password,
  email,
  profileImg,
}) => {
  const user = await User.create({
    username,
    fullName,
    password,
    email,
    profileImg,
  });

  return user;
};

export const findUserById = async (userId: string) => {
  const user = await User.findById({ _id: userId });

  if (!user) throw new Error('User id does not exists');
  return user;
};

interface UpdateUserI {
  fullName?: string;
  email?: string;
  profileImg?: string;
}

export const updateUser = async (
  userId: string,
  { fullName, profileImg, email }: UpdateUserI,
) => {
  return await User.findOneAndUpdate(
    {
      _id: userId,
    },
    { $set: { fullName, profileImg, email } },
    { new: true },
  );
};

export async function deleteUser(userId: string) {
  return await User.deleteOne({ _id: userId });
}
