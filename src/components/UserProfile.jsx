import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userLocation, setUserLocation] = useState({
    country: "",
    city: "",
  });
  // TODO: convert to useReducer for storing all the necessary user data

  useEffect(() => {
    if (!userLocation.country) {
      (async () => {
        console.log("API reqeust");
        let response = await fetch(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${
            import.meta.env.VITE_LOCATION_API_KEY
          }`
        );
        response = await response.json();
        console.log("Turbo 🚀 ~ response:", response);
        setUserLocation({ country: response.country, city: response.city });
      })();
    }
  }, []);

  return (
    <div>
      UserProfile: {userLocation.country} - {userLocation.city}
    </div>
  );
};

export default UserProfile;
