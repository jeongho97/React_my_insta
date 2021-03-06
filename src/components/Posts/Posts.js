import { useContext, useState } from "react";
import { Button, Container, Modal } from "reactstrap";
import { UserContext } from "../../store/UserContext";
import "./Posts.css";
const Posts = ({ posts, deletePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickPost, setClickPost] = useState();
  const openModal = (post) => {
    setClickPost(post);
    setIsOpen(true);
  };
  const closeModal = () => {
    setClickPost();
    setIsOpen(false);
  };
  const onClickDelete = (postId) => {
    deletePost(postId);
    closeModal();
  };

  return (
    <div className="Posts">
      {posts?.map((post) => (
        <div
          className="PostsImgBox"
          onClick={() => openModal(post)}
          key={post.id}
        >
          <img
            className="PostsImg"
            key={post.id}
            src={post.img}
            alt={post.content}
          ></img>
        </div>
      ))}
      {clickPost ? (
        <PostsDetail
          isOpen={isOpen}
          clickPost={clickPost}
          closeModal={closeModal}
          onClickDelete={onClickDelete}
        ></PostsDetail>
      ) : null}
    </div>
  );
};

export default Posts;

const PostsDetail = ({ isOpen, clickPost, closeModal, onClickDelete }) => {
  const { users } = useContext(UserContext);
  const getUser = () => {
    return users.find((user) => user.id === clickPost.userId);
  };
  const user = getUser();
  const myId = Number(localStorage.getItem("id"));
  return (
    <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
      <div className="PostsModalHeader">
        <div>
          <Button close onClick={closeModal}></Button>{" "}
        </div>
        <div>
          {user.name}
          <strong>게시물</strong>
        </div>
        <div>
          {user.id === myId ? (
            <Button
              color="danger"
              outline
              onClick={() => onClickDelete(clickPost.id)}
            >
              삭제하기
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Container>
        <div className="PostsBody">
          <div className="PostsBodyHeader">
            <div className="PostsBodyHeaderImgBox">
              <img
                className="PostsBodyHeaderImg"
                src={user.img}
                alt="userImg"
              ></img>
            </div>
            {user.name}
          </div>
          <img
            className="PostsBodyImg"
            src={clickPost?.img}
            alt="postimg"
          ></img>
          <p>{clickPost?.content}</p>
        </div>
      </Container>
    </Modal>
  );
};
