import { prisma } from "../utils/prisma";

export const getAll = async (query: any) => {
  const { status, search } = query;

  return prisma.application.findMany({
    where: {
      status: status || undefined,
      OR: search
        ? [
            {
              company_name: {
                contains: search
              }
            },
            {
              job_title: {
                contains: search
              }
            }
          ]
        : undefined
    },
    orderBy: {
      created_at: "desc"
    }
  });
};

export const getById = (id: string) => {
  return prisma.application.findUnique({
    where: { id }
  });
};

export const create = (data: any) => {
  return prisma.application.create({
    data: {
      ...data,
      applied_date: new Date(data.applied_date)
    }
  });
};

export const update = (id: string, data: any) => {
  return prisma.application.update({
    where: { id },
    data
  });
};

export const remove = (id: string) => {
  return prisma.application.delete({
    where: { id }
  });
};