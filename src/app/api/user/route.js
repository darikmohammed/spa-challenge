import { prisma } from '@/lib/model';
import { NextResponse as res } from 'next/server';

export async function POST(req) {
  try {
    const { name, sectors, agreement } = await req.json();
    if (!agreement)
      return res.json({ error: 'Require to agree to terms.' }, { status: 400 });
    const newUser = await prisma.user.create({
      data: {
        name,
      },
    });
    return await Promise.all(
      sectors.map(async (sectorId) =>
        prisma.sector_user.create({
          data: {
            user_id: newUser.id,
            sector_id: sectorId,
            agreement: true,
          },
        })
      )
    )
      .then((result) => {
        return res.json({ msg: 'Success' }, { status: 200 });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        return res.json({ error }, { status: 500 });
      });
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return res.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { userID, name: newName, sectors: newSectors } = await req.json();

    if (newName) {
      await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          name: newName,
        },
      });
    }

    const existingSectors = await prisma.sector_user.findMany({
      where: {
        user_id: userID,
      },
      select: {
        sector_id: true,
      },
    });

    const existingSectorIds = existingSectors.map((sector) => sector.sector_id);

    const sectorsToDelete = existingSectorIds.filter(
      (existingSectorId) => !newSectors.includes(existingSectorId)
    );

    const sectorsToAdd = newSectors.filter(
      (newSectorId) => !existingSectorIds.includes(newSectorId)
    );

    // Delete sectors to be removed
    await prisma.sector_user.deleteMany({
      where: {
        user_id: userID,
        sector_id: {
          in: sectorsToDelete,
        },
      },
    });

    // Add new sectors
    const createSectorPromises = sectorsToAdd.map((sectorId) =>
      prisma.sector_user.create({
        data: {
          user_id: userID,
          sector_id: sectorId,
        },
      })
    );

    const createdSectors = await Promise.all(createSectorPromises);

    console.log(JSON.stringify(createdSectors, null, 2));
    return res.json({ msg: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET /api/your-endpoint?userID=123

export async function GET(req) {
  try {
    const { userID } = await req.query;

    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        sectors: true,
      },
    });

    if (!user) {
      return res.json({ error: 'User not found' }, { status: 404 });
    }

    return res.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
