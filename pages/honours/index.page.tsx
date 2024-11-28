import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"

function Honours() {
  return (
    <div>
      <h1>our Honours</h1>
    </div>
  )
}
Honours.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default Honours