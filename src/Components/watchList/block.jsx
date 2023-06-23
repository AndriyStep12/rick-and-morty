import React, { useState, useEffect } from "react";

export default function Block(props) {
  const { name, watched, id, array, setArray } = props;
  const [watchedState, setWatchedState] = useState(watched);

  useEffect(() => {
    setWatchedState(watched);
  }, [watched]);

  const toggleWatched = () => {
    const updatedArray = array.map((item, index) =>
      index === id ? { ...item, watched: !watchedState } : item
    );
    setArray(updatedArray);
  };

  const deleteFunction = () => {
    const itemIndex = array.findIndex((item) => item.name === name);
    const filteredArray = [...array];
    filteredArray.splice(itemIndex, 1);
    setArray(filteredArray);
  };

  useEffect(() => {
    localStorage.setItem("saved_episodes", JSON.stringify(array));
  }, [array]);

  return (
    <div className="block_watchList" id={`blockOfList_${id}`}>
      <div
        className="del"
        id={`del${id}`}
        onClick={deleteFunction}
        aria-label={name}
      ></div>
      <span className="blockListText">{name}</span>
      <div
        className="watched"
        style={{
          background: watchedState
            ? "linear-gradient(135deg, #00FFF0 0%, #80FF53 100%)"
            : "linear-gradient(135deg, #111111 0%, #2A2A2A 100%)",
        }}
        onClick={toggleWatched}
      ></div>
    </div>
  );
}
