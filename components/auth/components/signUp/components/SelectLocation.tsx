// import React, { useState } from 'react';
// import LocationSearch from '@/components/locationSearch/LocationSearch';
// import Button from '@/components/ui/Button/Button';
// import SelectSuperStar from './SelectSuperStar';

// interface LocationData {
//   description: string;
//   place_id: string;
// }

// const SelectLocation = () => {
//   const [location, setLocation] = useState<LocationData | null>(null);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [superStar, setSuperStar] = useState<any>(null);

//   const handleSubmit = () => {
//     console.log("Location Submitted:", location?.description);
//     setSuperStar(true);
//   };

//   return (
//     <div className="">
//       {/* {!superStar && (
//         <div className="w-52 md:w-72 rounded-md">
//           <LocationSearch setLocation={setLocation} />
//           <p>{location?.description}</p>
//           <Button
//             textColor="text-white"
//             disabled={!location}
//             onClick={handleSubmit}
//           >
//             Confirm
//           </Button>
//         </div>
//       )} */}
//       {superStar && (
//         <SelectSuperStar />
//       )}
//     </div>
//   );
// };

// export default SelectLocation;
