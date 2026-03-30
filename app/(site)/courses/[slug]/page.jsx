import Breadcrumbs from '@/components/site/Breadcrumbs'
import CourseOverview from '@/components/site/CourseDetails'
import React from 'react'

const Page = () => {
  return (
    <div className='min-h-screen'>
        <Breadcrumbs />
        <CourseOverview />
    </div>
  )
}

export default Page