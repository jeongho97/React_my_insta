import "./ProfileBoard.css";
const ProfileBoard = ({ posts }) => {
  return (
    <div className="profileBoard">
      {posts?.map((data) => (
        <div className="profileBoardImg">
          <img
            className="profileBoardImg"
            key={data.id}
            src={data.img}
            alt={data.content}
          ></img>
        </div>
      ))}
    </div>
  );
};

export default ProfileBoard;
