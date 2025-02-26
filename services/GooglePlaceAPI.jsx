export const GetPhotoRef = async(placeName) => {
    const res = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json' +
  '?query=' + placeName +
  '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);

  const result = await res.json();

  console.log(result);
  return result;
}

export const GetHotelRatings = async (placeName) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    );

    const result = await res.json();

    if (result?.results?.length > 0) {
      return result.results[0]?.rating ?? "N/A";
    }

    return "N/A"; // Default if no results found
  } catch (error) {
    console.error("Error fetching hotel ratings:", error);
    return "N/A"; // Return default on error
  }
};

// Fetch Google Maps Place ID
export const GetGoogleMapsPlaceId = async (placeName) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    );

    const result = await res.json();

    if (result?.results?.length > 0) {
      return result.results[0]?.name ?? null;
    }

    return null; // Default if no place ID is found
  } catch (error) {
    console.error("Error fetching Google Maps Place ID:", error);
    return null;
  }
};