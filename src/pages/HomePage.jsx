import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Skeleton, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { fetchBoards } from "../api/fetchApi";
import { postBoard } from "../api/postApi";
import HomeBoardCard from "../components/HomeBoardCard";
import { addBoard } from "../features/boardsSlice";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [openPopover, setOpenPopover] = useState(null);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boards = useSelector((state)=>state.board.boards);

  useEffect(() => {
    fetchBoards()
      .then((res) => {
        res.forEach(board => {
          dispatch(addBoard(board));
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  const createNewBoard = async (event) => {
    event.preventDefault();
    if (!boardName.trim()) return;

    try {
      const response = await postBoard(boardName);

      dispatch(addBoard(response.data));
      setBoardName("");
      setOpenPopover(null);
      navigate(`/boards/${response.data.id}`);

    } catch (error) {
      throw new Error(`${error}`)
    }
  };

  const handleClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const open = Boolean(openPopover);

  return (
    <div className="flex flex-col w-full px-2 py-4 items-center">
      <h1 className="text-3xl font-bold m-4 mb-8">Boards</h1>

      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 min-[850px]:grid-cols-3 min-[1250px]:grid-cols-4 gap-4 max-w-[1200px] mb-8 ">

        {loading
          ? new Array(10).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={250}
                height={150}
                className="rounded-lg"
              />
            ))
          : boards.map((board, index) => (
              <HomeBoardCard key={index} board={board} />
            ))}

        {!loading && (
          <div
            onClick={handleClick}
            className="w-[220px] h-[100px] bg-slate-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-lg cursor-pointer"
          >
            Create New Board
          </div>
        )}
      </div>

      <Popover
        open={open}
        anchorEl={openPopover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <form
          onSubmit={createNewBoard}
          className="p-4 w-[300px] flex flex-col gap-4"
        >
          <TextField
            label="Name of the board"
            variant="outlined"
            fullWidth
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white py-2"
          >
            Create
          </Button>
        </form>
      </Popover>
    </div>
  );
};

export default HomePage;
