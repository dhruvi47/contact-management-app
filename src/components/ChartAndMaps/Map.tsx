import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";
import L from "leaflet";
import "./Map";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const markerIcon = new L.Icon({
  shadowUrl: shadowUrl,
  iconRetinaUrl: iconUrl,
  iconSize: [20, 30],
  shadowSize: [20, 30],
});

const fetchCountries = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

function Map() {
  const { isLoading, isError, data, error } = useQuery(
    "countriesData",
    fetchCountries
  );

  if (isLoading) {
    return (
      <>
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }
  const position: [number, number] = [51.505, -0.09];
  return (
    <div
      className="relative w-full h-screen"
      style={{
        display: "flex",
        margin: "0 auto",
        maxHeight: "400px",
        maxWidth: "900px",
      }}
    >
      <MapContainer
        className="h-full w-full"
        center={position}
        zoom={4}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {data.map((country: any) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={markerIcon}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
            }}
          >
            <Popup>
              <div className="flex items-center">
                <img
                  src={country.countryInfo.flag}
                  alt=""
                  className="mr-2"
                  height={20}
                  width={30}
                />
                <h2 className="font-bold">{country.country}</h2>
              </div>
              <div className="flex flex-col">
                <p style={{ margin: "0.3em 0" }}>
                  Active cases: {country.active}{" "}
                </p>
                <p style={{ margin: "0.3em 0" }}>
                  Recovered cases:{country.recovered}
                </p>
                <p style={{ margin: "0.3em 0" }}>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
