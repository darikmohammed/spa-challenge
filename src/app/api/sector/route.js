import { prisma } from '@/lib/model';
import { NextResponse as res } from 'next/server';

export async function GET(req) {
  try {
    const allSectors = await prisma.sector.findMany({});
    const groupedSectors = organizeSectors(allSectors);
    console.log({ groupedSectors });
    return res.json(groupedSectors, { status: 200 });
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return res.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function organizeSectors(sectors) {
  const sectorMap = new Map();

  sectors.forEach((sector) => {
    sectorMap.set(sector.id, sector);
  });

  const result = [];

  sectors.forEach((sector) => {
    if (!sector.parent_id) {
      result.push({
        label: sector.name,
        id: sector.id,
        child: groupChildSectors(sector.id, sectorMap, sectors),
      });
    }
  });
  return result;
}

function groupChildSectors(parentId, sectorMap, sectors) {
  const childSectors = sectors.filter(
    (sector) => sector.parent_id === parentId
  );

  return childSectors.map((childSector) => {
    return {
      label: childSector.name,
      id: childSector.id,
      child: groupChildSectors(childSector.id, sectorMap, sectors),
    };
  });
}
