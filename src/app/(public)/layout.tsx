import { Fragment } from 'react'

import { SmoothScroll } from '@/components/atoms/ui/smooth-scroll'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <SmoothScroll />
      {children}
    </Fragment>
  )
}

export default PublicLayout
