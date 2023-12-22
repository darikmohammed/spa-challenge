'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sectors = [
  {
    value: [
      {
        value: '19',
        label: 'Construction materials',
      },
      {
        value: '18',
        label: 'Electronics and Optics',
      },
      {
        value: [
          {
            value: '342',
            label: 'Bakery & confectionery products',
          },
          {
            value: '43',
            label: 'Beverages',
          },
          {
            value: '42',
            label: 'Fish & fish products',
          },
          {
            value: '41',
            label: 'Meat & meat products',
          },
          {
            value: '40',
            label: 'Milk & dairy products',
          },
          {
            value: '39',
            label: 'Other Foods',
          },
          {
            value: '38',
            label: 'Sweets & snack food',
          },
        ],
        label: 'Food and Beverage',
      },
      {
        label: 'Furniture',
        value: [
          {
            value: '370',
            label: 'Bathroom/sauna',
          },
          {
            value: '357',
            label: 'Bedroom',
          },
          {
            value: '369',
            label: 'Children’s room',
          },
          {
            value: '367',
            label: 'Kitchen',
          },
          {
            value: '368',
            label: 'Living room',
          },
          {
            value: '366',
            label: 'Office',
          },
          {
            value: '356',
            label: 'Other (Furniture)',
          },
        ],
      },
      {
        label: 'Machinery',
        value: [
          {
            value: '317',
            label: 'Machinery components',
          },
          {
            value: '318',
            label: 'Machinery equipment/tools',
          },
          {
            value: '319',
            label: 'Manufacture of machinery',
          },
          {
            value: [
              {
                value: '271',
                label: 'Aluminium and steel work',
              },
              {
                value: '272',
                label: 'Boat/Yacht building',
              },
            ],
            label: 'Maritime',
          },
        ],
      },
    ],
    label: 'Manufacturing',
  },
  {
    label: 'Other',
    value: [
      {
        value: '453',
        label: 'Creative industries',
      },
      {
        value: '452',
        label: 'Energy technology',
      },
      {
        value: '455',
        label: 'Environment',
      },
      {
        value: '454',
        label: 'Services',
      },
    ],
  },
];

export function Sector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState('');

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Sector" />
      </SelectTrigger>
      <SelectContent>
        {sectors.map((sector) =>
          renderSectors(
            sector,
            (currentValue, label) => {
              setValue(currentValue === value ? '' : currentValue);
              setSelected(currentValue === value ? '' : label);
              setOpen(false);
            },
            value
          )
        )}
      </SelectContent>
    </Select>
  );
}

function renderSectors(sector, onSelect, selectedValue) {
  return (
    <SelectGroup key={sector.label}>
      {Array.isArray(sector.value) ? (
        <>
          <SelectLabel>{sector.label}</SelectLabel>
          {sector.value.map((sector) =>
            renderSectors(sector, onSelect, selectedValue)
          )}
        </>
      ) : (
        <SelectItem value={sector.value}>{sector.label}</SelectItem>
      )}
    </SelectGroup>
  );
}
