import Prisma from '../prisma';

export const isValidSession = async (accessToken: string): Promise<boolean> => {
  console.log(accessToken)
  if (!accessToken) {
    return false;
  }

  const result = await Prisma.session.findFirst({
    where: {
      accessToken
    }
  });

  return !!result;
}
