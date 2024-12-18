import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCompletedItinerary, submitRatings } from "../../api/travel-service/complete-travel";

const RatingPage = () => {
  const { travelId } = useParams();
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetchCompletedItinerary(travelId);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching itinerary places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [travelId]);

  const handleRating = (placeId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [placeId]: rating,
    }));
  };

  const handleSave = async () => {
    try {
      const reviewData = places.map((place) => ({
        place: {
          placeId: place.placeId,
          placeName: place.placeName,
          placeAddress: place.placeAddress,
          latitude: place.latitude,
          longitude: place.longitude,
        },
        rating: ratings[place.placeId] || 0,
      }));

      await submitRatings(travelId, reviewData);
      alert("별점이 저장되었습니다!");
      navigate(`/completed-itinerary/${travelId}`);
    } catch (error) {
      console.error("Error saving ratings:", error);
      alert("별점 저장 중 문제가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading...</div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-blue-500 mb-8 mt-12">
        이번 여행은 어떠셨나요?
      </h1>

      <div className="space-y-6">
  {places.map((place, index) => (
    <div
      key={place.placeId}
      className="border p-8 rounded-lg shadow-sm flex items-center relative"
    >
      {/* 순번 표시 */}
      <div className="absolute left-0 top-0 h-full w-[3%] bg-blue-500 flex items-center justify-center rounded-l-lg">
        <span className="text-white font-bold text-lg">{index + 1}</span>
      </div>

      {/* 여행지 정보 */}
      <div className="ml-[3%] w-full flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">{place.placeName}</h2>
          <p className="text-sm text-gray-500 mt-1">{place.placeAddress}</p>
        </div>

        {/* 별점 */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(place.placeId, star)}
              className={`text-3xl sm:text-5xl ${
                ratings[place.placeId] >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>



      {/* 저장 버튼 */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-lg font-semibold"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default RatingPage;
