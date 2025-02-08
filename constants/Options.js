export const SelectTravellerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveller in exploration",
    icon: "🚲",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A pair of travellers in love",
    icon: "🏍️",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family of adventure seekers",
    icon: "🚗",
    people: "3 to 5",
  },
  {
    id: 4,
    title: "Friends Group",
    desc: "A group of friends in fun",
    icon: "✈️",
    people: "5 to 10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay cost conscious",
    icon: "💵",
  },
  {
    id: 2,
    title: "Mid-Range",
    desc: "Find a balance",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in the finer things",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNight} Nights for {traveller} with a {budget} budget with the Flight details, Flight Price with Booking url, Hotel options list with HotelName, Hotel address, Price, Hotel image url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.";
