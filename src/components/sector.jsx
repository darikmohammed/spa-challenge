'use client';

import * as React from 'react';

import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import axios from 'axios';

import { Loader2 } from 'lucide-react';

export function Sector({ selected, setSelected }) {
  const [loading, setLoading] = React.useState(false);

  const [sectors, setSectors] = React.useState([]);

  const { toast } = useToast();

  const fetchSectors = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/sector');
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching sectors:', error);
      // Handle the error as needed
      throw error;
    }
  };

  React.useEffect(() => {
    fetchSectors()
      .then((data) => setSectors(data))
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Error fetching sectors',
          description: 'Please refresh the page and try again.',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (sectorId) => {
    if (selected.includes(sectorId)) {
      setSelected(selected.filter((id) => id !== sectorId));
    } else {
      setSelected([...selected, sectorId]);
    }
  };

  return (
    <>
      {loading ? (
        <p className=" flex  items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading Sectors please wait ...
        </p>
      ) : (
        <Card className="h-96 overflow-scroll">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sector</CardTitle>
            <CardDescription className=" text-xs text-muted-foreground font-normal">
              Please select the sector(s) you are currently involved in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sectors.map((sector) =>
              renderSectors(sector, handleSelect, selected)
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

function renderSectors(sector, onSelect, selectedValue) {
  return (
    <div key={sector.id}>
      {sector.child?.length > 0 ? (
        <>
          <p className="font-medium text-sm text-muted-foreground">
            {sector.label}
          </p>
          <div className="ml-4 mt-2 mb-4 space-y-2">
            {sector.child.map((childSector) =>
              renderSectors(childSector, onSelect, selectedValue)
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={sector.id}
            value={sector.id}
            checked={selectedValue.includes(sector.id)}
            onCheckedChange={() => {
              onSelect(sector.id);
            }}
          />
          <label
            htmlFor={sector.id}
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
          >
            {sector.label}
          </label>
        </div>
      )}
    </div>
  );
}
