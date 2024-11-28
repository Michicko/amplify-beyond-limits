import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"

function PlayerStats() {
  return (
    <div>
      <h1>Player Stats</h1>
      <p>Latest Team Stats</p>
    </div>
  )
}
PlayerStats.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default PlayerStats