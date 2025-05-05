'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import Link from 'next/link';
import { UserDetailContext } from '@/context/UserDetailContext';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-4 flex justify-between items-center">
      <Link href={'/'}>
        <Image src={'/logo.png'} alt="logo" width={40} height={40} />
      </Link>
      
      {!userDetail?.name && 
        <div className="flex gap-5 ">
          <Button variant="ghost" className="cursor-pointer">Sign In</Button>
          <Button
            className="text-white cursor-pointer"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>}
    </div>
  );
}

export default Header;
