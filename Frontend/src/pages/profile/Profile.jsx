import React from "react";

import "./Profile.css";
import TimeLine from "../../components/TimeLine/TimeLine";
import timeLineData from "../../data/timeLineData.json";

const profileInfo = {
  fullName: "Jane Doe",
  description: "Hello, I'm Jane. This is my Description.",
  urls: [
    "https://www.google.com",
    "https://www.linkedin.com",
    "https://www.discord.com",
  ],
};

const ProfileInfo = () => {
  return (
    <div className="profile">
      <h1>{profileInfo.fullName}</h1>
      <p>{profileInfo.description}</p>
      <ul>
        {profileInfo.urls.map((url, index) => (
          <li key={index}>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <ProfileInfo />
      <TimeLine data={timeLineData} />
    </div>
  );
};

export default Profile;
