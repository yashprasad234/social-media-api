import "./rightbar.css";
import { Users } from "../../dummyData.js";
import Online from "../online/Online.jsx";
import UserFriend from "../userFriend/UserFriend.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [isFollowed, setIsFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  // console.log(user);

  useEffect(() => {
    setIsFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "https://social-media-api-lrkb.onrender.com/api/users/friends/" +
            user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.put(
          `https://social-media-api-lrkb.onrender.com/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `https://social-media-api-lrkb.onrender.com/api/users/${user._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.error(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={SF + "gift.png"} alt="birthday" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={SF + "ad.png"} alt="ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {isFollowed ? "Unfollow" : "Follow"}
            {isFollowed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">City:</div>
            <div className="rightbarInfoValue">{user.city}</div>
          </div>
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">From:</div>
            <div className="rightbarInfoValue">{user.from}</div>
          </div>
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">Relationship:</div>
            <div className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </div>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <UserFriend friend={friend} />
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
