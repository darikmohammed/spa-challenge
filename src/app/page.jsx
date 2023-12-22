'use client';

import * as React from 'react';

import { object, string, array } from 'yup';

import { useToast } from '@/components/ui/use-toast';
import { Sector } from '@/components/sector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import axios from 'axios';

import { Loader2 } from 'lucide-react';

export default function Home() {
  const [selected, setSelected] = React.useState([]);
  const [submit, setSubmit] = React.useState(false);

  const { toast } = useToast();

  const validationSchema = object({
    terms: string().required('Please accept the terms and conditions'),
    sectors: array().min(1, 'Please select at least one sector'),
    name: string().required('Name is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('here');
    setSubmit(true);
    const formValues = Object.fromEntries(new FormData(e.target));
    formValues.sectors = selected;

    try {
      const value = await validationSchema.validate(formValues);
      axios
        .post('/api/user', {
          name: value.name,
          sectors: value.sectors,
          agreement: true,
        })
        .then((response) => {
          toast({
            variant: 'success',
            title: 'Submitted profile!',
            description: response.data?.msg,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            variant: 'destructive',
            title: 'Error saving your data!',
            description: error?.message || 'Something Went Wrong.',
          });
          setSubmit(false);
        });
    } catch (error) {
      error.errors.forEach((err) => {
        console.log(err);
        toast({
          variant: 'destructive',
          title: 'Error saving your data!',
          description: err,
        });
        setSubmit(false);
      });
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className=" text-base font-medium">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center flex-col gap-5"
      >
        {console.log(submit)}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="name" id="name" name="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Sector selected={selected} setSelected={setSelected} />
        </div>
        <div className="flex items-center space-x-2 max-w-sm w-full mt-4">
          <Checkbox id="terms" name="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>

        <Button
          className="flex max-w-sm w-full"
          disabled={submit}
          type="submit"
        >
          {submit ? (
            <div className="flex gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </main>
  );
}
