import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { CheckCircle } from 'lucide-react';
import Form from './form';

function UserDetail({ userDetail }) {
  const extractSectorIds = () => {
    if (userDetail?.user?.sector_user) {
      // Use map to extract sector IDs from the sector_user array
      const sectorIds = userDetail.user.sector_user.map(
        (sector) => sector.sector_id
      );
      return sectorIds;
    } else {
      // Handle the case where the structure is not as expected
      console.error('Invalid userDetail structure:', userDetail);
      return [];
    }
  };

  return (
    <Card className="md:w-[700px]">
      <CardHeader>
        <CardTitle className="text-sm font-medium">User Detail</CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-normal">
          Please view your saved sector(s) you are involved in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
          <div className="flex gap-1 items-center">
            <p className="text-sm font-medium  ">Name: </p>
            <p className="text-sm font-normal text-muted-foreground ">
              {userDetail?.user?.name}
            </p>
          </div>
          <div className="h-[1px] w-full bg-muted md:hidden my-2" />
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <p className="text-sm font-medium">Sectors: </p>
            <div className="flex flex-col gap-1">
              {userDetail?.user?.sector_user?.map((sector) => (
                <div
                  key={sector.sector_id}
                  className="flex gap-2 items-center text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4" />
                  <p className="text-sm font-normal">{sector?.sector?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Sheet>
          <SheetTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Edit
          </SheetTrigger>
          <SheetContent>
            <Form
              edit={true}
              user={userDetail?.user?.name}
              id = {userDetail?.user?.id}
              sector={extractSectorIds()}
            />
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}

export default UserDetail;
