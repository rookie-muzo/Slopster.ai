"use client"

import Image from 'next/image'
import Icon from '../slopOtransparent.webp'

export default function Mascot() {
  return (
    <div
      className="fixed bottom-6 right-6 hidden md:block select-none"
      aria-hidden
    >
      <div className="mascot-bob transition-transform hover:-rotate-6">
        <Image
          src={Icon}
          alt=""
          className="h-11 w-11 drop-shadow"
          priority
        />
      </div>
    </div>
  )
}


