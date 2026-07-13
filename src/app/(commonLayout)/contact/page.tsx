import ContactPageComponent from '@/components/modules/home/contact'
import PageHeroSection from '@/components/shared/page-hero-section';
import React from 'react'

const page = () => {
  return (
    <div>
      <PageHeroSection
        badge="Connect"
        title="Start A Conversation"
        description="Have questions about our platform or want to list your turf? Our team is ready to scale your sports experience."
      />

      <ContactPageComponent />
    </div>
  );
}

export default page