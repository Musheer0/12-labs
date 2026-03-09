"use client"
import { useAuth } from '@clerk/nextjs';
import React from 'react';

const ProtectedComponent = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth()
if(auth.userId)
  return (
    children
  );
};

export default ProtectedComponent;