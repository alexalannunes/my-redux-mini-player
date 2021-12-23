import React, { memo, useEffect, useRef } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { audios } from "../../audios";
import styles from "./Player.module.css";
import { pause, play, playSelector, selectPlayerMemo } from "./playerSlice";

const NativeAudio = ({ current }) => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const handlePlay = (e) => {
    !current.isPlaying && dispatch(play(current));
  };

  const handlePause = (e) => {
    current.isPlaying && dispatch(pause(current));
  };

  useEffect(() => {
    current.isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [current]);

  return (
    <div className={styles.cardHeader__player}>
      <audio
        controls
        src={current?.audio || ""}
        onPlay={(e) => handlePlay(e)}
        onPause={(e) => handlePause(e)}
        ref={audioRef}
      />
    </div>
  );
};

const Disc = ({ isPlaying, letter }) => {
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
};

function CardHeader() {
  const player = useSelector(selectPlayerMemo);

  return (
    <div className={styles.cardHeader}>
      <Disc
        isPlaying={player.current.isPlaying}
        letter={player?.current?.name?.charAt(0)}
      />
      <NativeAudio current={player.current} />
    </div>
  );
}

const IconControl = memo(({ isPlaying }) =>
  isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />
);

const ListItem = ({ audio, current }) => {
  const dispatch = useDispatch();
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
};

function CardBody() {
  const player = useSelector(playSelector);
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBodyList}>
        {audios.map((audio) => (
          <ListItem audio={audio} current={player.current} key={audio.id} />
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
