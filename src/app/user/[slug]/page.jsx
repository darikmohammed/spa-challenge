'use client';

import * as React from 'react';

import { useToast } from '@/components/ui/use-toast';

import axios from 'axios';

import { Loader2 } from 'lucide-react';
import UserDetail from '@/components/detail';

function DetailPage({ params }) {
  const { slug } = params;

  const [loading, setLoading] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState();

  const { toast } = useToast();

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user?userID=${slug}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching User details: ', error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchUserDetail()
      .then((data) => {
        setUserDetail(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        toast({
          variant: 'destructive',
          title: 'Error fetching your detail',
          description: 'Please refresh the page and try again.',
        });
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <p className=" flex  items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading your Data please wait ...
        </p>
      ) : (
        <UserDetail userDetail={userDetail} />
      )}
    </div>
  );
}

export default DetailPage;
