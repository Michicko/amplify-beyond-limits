import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"

function TeamStats() {
  return (
    <div>
      <h1>TeamStats</h1>
      <p>Latest Team Stats</p>
    </div>
  )
}
TeamStats.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default TeamStats