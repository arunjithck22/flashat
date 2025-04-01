"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import InputBox from "../ui/inputBox/InputBox";
import { IoCloseCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const libraries: Libraries = ["places"];

// Type definitions 
interface Suggestion {
  place_id: string;
  description: string;
}

interface Location {
  lat: number;
  lng: number;
  description: string;
}

interface LocationSearchProps {
  close?: () => void;
  setLocation?: (location: Location) => void ; // Function to pass selected location back to parent
}

const fetchSuggestions = (
  input: string,
  autocompleteService: google.maps.places.AutocompleteService | null
): Promise<Suggestion[]> => {
  return new Promise((resolve) => {
    if (!input || !autocompleteService) {
      resolve([]);
      return;
    }

    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
        resolve([]);
        return;
      }

      resolve(
        predictions.map((p) => ({
          place_id: p.place_id,
          description: p.description,
        }))
      );
    });
  });
};

const LocationSearch: React.FC<LocationSearchProps> = ({ close, setLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  // const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (isLoaded) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(document.createElement("div"));
    }
  }, [isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value && autocompleteService.current) {
      fetchSuggestions(value, autocompleteService.current).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (placesService.current) {
      placesService.current.getDetails(
        { placeId: suggestion.place_id, fields: ["geometry"] },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
            const location: Location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              description: suggestion.description,
            };

            if(setLocation){
              // Set the location in the local state and pass it to the parent component via setLocation
              // setSelectedLocation(location);
              setLocation(location);  // Passing the selected location back to the parent
            }

            // Close the suggestions if needed
            setInputValue(suggestion.description);
            setSuggestions([]);
            if (close) close();
          }
        }
      );
    }
  };

  return (
    <div className="relative w-full">
      <InputBox
        label="Location"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search location..."
        backgroundColor="bg-[#F1F1F6]"
        padding="p-2.5"
        borderRadius="rounded"
        textColor="text-black"
        maxLength={100}
        required={false}
        maxLengthIndicator={false}
      />

      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            setSuggestions([]);
          }}
          className="absolute right-2 top-8 text-gray-500"
        >
          <IoCloseCircle
            size={20}
            className="text-gray-300 hover:text-gray-500"
          />
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className=" top-full left-0 mt-1 w-full bg-white max-h-60 overflow-auto custom-scrollbar-hidden">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center text-sm px-2 py-2 cursor-pointer hover:bg-gray-100 border border-gray-100 rounded-md gap-2 text-grayShade"
            >
              <FaLocationDot /> {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      {/* {selectedLocation && (
        <div className="mt-2 text-sm text-gray-700">
          Selected: {selectedLocation.description} ({selectedLocation.lat}, {selectedLocation.lng})
        </div>
      )} */}
    </div>
  );
};

export default LocationSearch;
