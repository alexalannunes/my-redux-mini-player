import React, { memo } from "react";
import { audios } from "../../audios";
import { MdPlayArrow, MdPause } from "react-icons/md";
import styles from "./Player.module.css";
import { useDispatch, useSelector } from "react-redux";
import { pause, play, playSelector } from "./playerSlice";

function AudioFn() {
  const audioRef = React.useRef();
  const player = useSelector(playSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (player.playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [player]);

  return (
    <audio
      onPause={(e) => dispatch(pause(player.audio))}
      onPlay={(e) => dispatch(play(player.audio))}
      ref={audioRef}
      controls
      src={player.audio?.audio || ""}
    />
  );
}
function CardHeader() {
  const player = useSelector(playSelector);
  const dispatch = useDispatch();

  return (
    <div className={styles.cardHeader}>
      <div className={styles.cardHeader__image}>
        <div
          className={`${styles.cardHeader__image__disc} ${
            player.playing && styles.cardHeader__image__disc__Rotate
          }`}
        >
          {player.audio?.name?.charAt(0)}
        </div>
      </div>
      <div className={styles.cardHeader__player}>
        {player.audio && (
          <span
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              if (player.playing) {
                dispatch(pause(player.audio));
              } else {
                dispatch(play(player.audio));
              }
            }}
          ></span>
        )}
        <AudioFn player={player} />
      </div>
    </div>
  );
}

const ListItem = memo(({ audio }) => {
  const player = useSelector(playSelector);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        if (player.playing && player?.audio?.name === audio.name) {
          console.log("pause", player, audio);

          dispatch(pause(audio));
        } else {
          console.log("play");
          dispatch(play(audio));
        }
      }}
      className={styles.cardBodyList__item}
    >
      <span className={styles.cardBodyList__item__icon}>
        {player.playing && player.audio?.name === audio.name ? (
          <MdPause size={24} />
        ) : (
          <MdPlayArrow size={24} />
        )}
      </span>
      <span>{audio.name}</span>
    </div>
  );
});
ListItem.displayName = "ListItem";
function CardBody() {
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBodyList}>
        {audios.map((audio, index) => (
          <ListItem audio={audio} key={index} />
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
