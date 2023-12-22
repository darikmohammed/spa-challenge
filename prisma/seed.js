import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sectorsSeed = [
  { id: '1', name: 'Manufacturing', parent_id: null },
  { id: '19', name: 'Construction materials', parent_id: '1' },
  { id: '18', name: 'Electronics and Optics', parent_id: '1' },
  { id: '6', name: 'Food and Beverage', parent_id: '1' },
  { id: '342', name: 'Bakery & confectionery products', parent_id: '6' },
  { id: '43', name: 'Beverages', parent_id: '6' },
  { id: '42', name: 'Fish & fish products', parent_id: '6' },
  { id: '40', name: 'Meat & meat products', parent_id: '6' },
  { id: '39', name: 'Milk & dairy products', parent_id: '6' },
  { id: '437', name: 'Other Foods', parent_id: '6' },
  { id: '378', name: 'Sweets & snack food', parent_id: '6' },
  { id: '13', name: 'Furniture', parent_id: '1' },
  { id: '389', name: 'Bathroom/sauna', parent_id: '13' },
  { id: '385', name: 'Bedroom', parent_id: '13' },
  { id: '390', name: 'Children’s room', parent_id: '13' },
  { id: '98', name: 'Kitchen', parent_id: '13' },
  { id: '101', name: 'Living room', parent_id: '13' },
  { id: '392', name: 'Office', parent_id: '13' },
  { id: '394', name: 'Other (Furniture)', parent_id: '13' },
  { id: '341', name: 'Outdoor', parent_id: '13' },
  { id: '99', name: 'Project furniture', parent_id: '13' },
  { id: '12', name: 'Machinery', parent_id: '1' },
  { id: '94', name: 'Machinery components', parent_id: '12' },
  { id: '91', name: 'Machinery equipment/tools', parent_id: '12' },
  { id: '224', name: 'Manufacture of machinery', parent_id: '12' },
  { id: '97', name: 'Maritime', parent_id: '12' },
  { id: '271', name: 'Aluminium and steel workboats', parent_id: '97' },
  { id: '269', name: 'Boat/Yacht building', parent_id: '97' },
  { id: '230', name: 'Ship repair and conversion', parent_id: '97' },
  { id: '93', name: 'Metal structures', parent_id: '12' },
  { id: '508', name: 'Other', parent_id: '12' },
  { id: '227', name: 'Repair and maintenance service', parent_id: '12' },
  { id: '11', name: 'Metalworking', parent_id: '1' },
  { id: '67', name: 'Construction of metal structures', parent_id: '11' },
  { id: '263', name: 'Houses and buildings', parent_id: '11' },
  { id: '267', name: 'Metal products', parent_id: '11' },
  { id: '542', name: 'Metal works', parent_id: '11' },
  { id: '75', name: 'CNC-machining', parent_id: '11' },
  { id: '62', name: 'Forgings, Fasteners', parent_id: '11' },
  { id: '69', name: 'Gas, Plasma, Laser cutting', parent_id: '11' },
  { id: '66', name: 'MIG, TIG, Aluminum welding', parent_id: '11' },
  { id: '9', name: 'Plastic and Rubber', parent_id: '1' },
  { id: '54', name: 'Packaging', parent_id: '9' },
  { id: '556', name: 'Plastic goods', parent_id: '9' },
  { id: '559', name: 'Plastic processing technology', parent_id: '9' },
  { id: '55', name: 'Blowing', parent_id: '559' },
  { id: '57', name: 'Moulding', parent_id: '559' },
  { id: '53', name: 'Plastics welding and processing', parent_id: '559' },
  { id: '560', name: 'Plastic profiles', parent_id: '9' },
  { id: '5', name: 'Printing', parent_id: '1' },
  { id: '148', name: 'Advertising', parent_id: '5' },
  { id: '150', name: 'Book/Periodicals printing', parent_id: '5' },
  { id: '145', name: 'Labelling and packaging printing', parent_id: '5' },
  { id: '7', name: 'Textile and Clothing', parent_id: '1' },
  { id: '44', name: 'Clothing', parent_id: '7' },
  { id: '45', name: 'Textile', parent_id: '7' },
  { id: '8', name: 'Wood', parent_id: '1' },
  { id: '337', name: 'Other (Wood)', parent_id: '8' },
  { id: '51', name: 'Wooden building materials', parent_id: '8' },
  { id: '47', name: 'Wooden houses', parent_id: '8' },
  { id: '3', name: 'Other', parent_id: null },
  { id: '37', name: 'Creative industries', parent_id: '3' },
  { id: '29', name: 'Energy technology', parent_id: '3' },
  { id: '33', name: 'Environment', parent_id: '3' },
  { id: '2', name: 'Service', parent_id: null },
  { id: '25', name: 'Business services', parent_id: '2' },
  { id: '35', name: 'Engineering', parent_id: '2' },
  {
    id: '28',
    name: 'Information Technology and Telecommunications',
    parent_id: '2',
  },
  {
    id: '581',
    name: 'Data processing, Web portals, E-marketing',
    parent_id: '28',
  },
  { id: '576', name: 'Programming, Consultancy', parent_id: '28' },
  { id: '121', name: 'Software, Hardware', parent_id: '28' },
  { id: '122', name: 'Telecommunications', parent_id: '28' },
  { id: '22', name: 'Tourism', parent_id: '2' },
  { id: '141', name: 'Translation services', parent_id: '2' },
  { id: '21', name: 'Transport and Logistics', parent_id: '2' },
  { id: '111', name: 'Air', parent_id: '21' },
  { id: '114', name: 'Rail', parent_id: '21' },
  { id: '112', name: 'Road', parent_id: '21' },
  { id: '113', name: 'Water', parent_id: '21' },
];

async function main() {
  await Promise.all(
    sectorsSeed.map(async (sector) =>
      prisma.sector.upsert({
        where: { id: sector.id },
        update: {},
        create: sector,
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
