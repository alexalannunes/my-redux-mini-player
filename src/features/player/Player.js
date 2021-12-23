import React, { memo } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { audios } from "../../audios";
import styles from "./Player.module.css";
import { pause, play, playSelector } from "./playerSlice";

const Disc = memo(({ isPlaying, letter }) => {
  return (
    <div className={styles.cardHeader__image}>
      <div
        className={`${styles.cardHeader__image__disc} ${
          isPlaying.playing && styles.cardHeader__image__disc__Rotate
        }`}
      >
        {letter}
      </div>
    </div>
  );
});

function CardHeader() {
  const player = useSelector(playSelector);

  return (
    <div className={styles.cardHeader}>
      <Disc
        isPlaying={player.current.isPlaying}
        letter={player?.current?.name?.charAt(0)}
      />
      <div className={styles.cardHeader__player}>
        <audio controls src={player.current?.audio || ""} />
      </div>
    </div>
  );
}

const IconControl = memo(({ isPlaying }) =>
  isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />
);

const ListItem = memo(({ audio, current, dispatch }) => {
  return (
    <div
      onClick={() => {
        if (current?.isPlaying && current?.name === audio.name) {
          dispatch(pause(audio));
        } else {
          dispatch(play(audio));
        }
      }}
      className={styles.cardBodyList__item}
    >
      <span className={styles.cardBodyList__item__icon}>
        <IconControl
          isPlaying={current?.isPlaying && current?.name === audio.name}
        />
      </span>
      <span>{audio.name}</span>
    </div>
  );
});

function CardBody() {
  const player = useSelector(playSelector);
  const dispatch = useDispatch();
  console.log(player);
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBodyList}>
        {audios.map((audio, index) => (
          <ListItem
            audio={audio}
            current={player.current}
            dispatch={dispatch}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export function Player() {
  return (
    <div className={styles.card}>
      <CardHeader />
      <CardBody />
    </div>
  );
}
