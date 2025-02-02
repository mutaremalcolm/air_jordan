<!-- Headings -->
<div align="center">
    <h1>Air Jordan</h1>
    <h6>
        Built with <a href="https://nextjs.org">Next.js</a> &
        hosted by <a href="https://vercel.com/">Vercel</a> 
    </h6>
    <h4>
      <a href="https://air-jordan-chi.vercel.app/" target="_blank">
        🔗 Demo Website
      </a>
    </h4>
    <h4>
      <a href="https://github.com/users/mutaremalcolm/projects/14" target="_blank">
        🔗 Project Kanban (See the development steps)
      </a>
    </h4>
    <hr>
</div>

# **Introduction**
**Air Jordan** (yes, a play on the basketball player) is a dashboard web application that provides **real-time pollution data** for any location in the world. This project was an exciting opportunity to work with a **large dataset via API calls** and display **live environmental data**. 

The application leverages data from the **OpenWeather API**, incorporates **geocoding for location searches**, and includes **map functionality** to enhance the user experience.

---

## **Project Goals**
1. **Real-Time Data Retrieval**
   - Fetches **live air quality index (AQI) data** for any location worldwide.
   - Ensures up-to-the-minute accuracy using OpenWeather’s Air Pollution API.

2. **AQI Visualization**
   - Displays **AQI levels** in a user-friendly gauge format.
   - Provides a clear **color-coded system** to help users quickly interpret air quality.

3. **Pollutant Breakdown**
   - Lists the **main air pollutants** (CO, NO2, O3, PM2.5, PM10, etc.).
   - Helps users understand which pollutants contribute to poor air quality.

4. **Location Search Functionality**
   - Users can search for **any city or coordinates** to get localized air quality data.
   - Implements geocoding to convert city names into latitude/longitude values.

5. **Interactive Map Integration**
   - Displays the searched location on an interactive map.
   - Utilizes **Mapbox** for a seamless and visually engaging map experience.
   - Allows users to **explore different regions** and their air quality levels.

---

## **Tech Stack**
- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **APIs Used**:
  - OpenWeather Air Pollution API (for AQI data)
  - OpenWeather Geocoding API (for location searches)
  - Mapbox API (for map rendering)
- **Hosting**: Vercel
- **State Management**: React Hooks (useState, useEffect)
- **Additional Libraries**: Axios (for API calls), Dynamic Imports (for SSR optimizations)

---