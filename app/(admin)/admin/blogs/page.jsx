import Breadcrumbs from '@/components/admin/Breadcrumbs';
import React from 'react'

const Page = () => {
  const breadcrumbData = [
    { label: "Blogs" },
  ];
  return (
    <div>
     <Breadcrumbs items={breadcrumbData} />
      
    </div>
  )
}

export default Page