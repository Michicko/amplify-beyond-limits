import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"

function ourHistory() {
  return (
    <div>
      <h1>our History</h1>
    </div>
  )
}
ourHistory.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default ourHistory