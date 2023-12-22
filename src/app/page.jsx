import { Sector } from '@/components/sector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className=" text-base font-medium">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>

      {/*  form  */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="name" id="name" placeholder="Name" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="sector">Sector</Label>
        <Sector id="sector" />
      </div>
      <div className="flex items-center space-x-2 max-w-sm w-full mt-4">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <Button className="flex max-w-sm w-full">Save</Button>
    </main>
  );
}
