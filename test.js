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
        child: groupChildSectors(sector.id, sectorMap),
      });
    }
  });

  console.log(JSON.stringify(result, null, 2));
  return result;
}

function groupChildSectors(parentId, sectorMap) {
  const childSectors = sectors.filter(
    (sector) => sector.parent_id === parentId
  );

  return childSectors.map((childSector) => {
    return {
      label: childSector.name,
      id: childSector.id,
      child: groupChildSectors(childSector.id, sectorMap),
    };
  });
}

const sectors = [
  {
    id: 1,
    name: 'Agriculture',
    parent_id: null,
  },
  {
    id: 2,
    name: 'Food & Beverage',
    parent_id: 1,
  },
  {
    id: 3,
    name: 'Food Production',
    parent_id: 1,
  },
  {
    id: 4,
    name: 'Food Processing',
    parent_id: 2,
  },
  {
    id: 5,
    name: 'Other',
    parent_id: null,
  },
  {
    id: 6,
    name: 'Other Child',
    parent_id: 5,
  },
];

organizeSectors(sectors);
