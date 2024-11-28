import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"

function International() {
  return (
    <div>
      <h1>International Competitions</h1>
      <p>Latest International Competition Information</p>
    </div>
  )
}
International.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default International