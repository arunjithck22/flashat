"use client";
import PanelLayout from '@/components/PanelLayout/PanelLayout';
import React, { useState } from 'react';
import HuddleHeading from '@/view/huddles/components/HuddleHeading';
import HuddleMessages from '../components/HuddleMessages';

const PublicHuddles = () => {
  const [selectedHuddleId, setSelectedHuddleId] = useState<number | null>(null);
  const isDataAvailable = selectedHuddleId !== null;

  // 💾 Dummy data for the header
  const dummyHuddle = {
    title: "Design Standup",
    participants: 12,
    online: 5,
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblue-bird&psig=AOvVaw2TYvHOyBbN74-3sO1FDmwa&ust=1743241330637000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOC4r5S-rIwDFQAAAAAdAAAAABAJ",
    premium: true,
  };

  return (
    <div>
      <PanelLayout
        tabDisabled={true}
        leftComponent={<div>hello</div>}
        rightComponent={
          isDataAvailable ? (
            <HuddleMessages huddleId={selectedHuddleId} />
          ) : null
        }
        dataAvailable={isDataAvailable}
        rightHeader={
          <HuddleHeading
            title={dummyHuddle.title}
            participants={dummyHuddle.participants}
            online={dummyHuddle.online}
            imageUrl={dummyHuddle.imageUrl}
            premium={dummyHuddle.premium}
            onEdit={() => console.log("Edit clicked")}
            onMore={() => console.log("More clicked")}
          />
        }
      />
    </div>
  );
};

export default PublicHuddles;
