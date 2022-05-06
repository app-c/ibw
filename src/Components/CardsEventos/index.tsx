/* eslint-disable react/require-default-props */
import React, { useCallback, useState } from "react";
import { Alert, Image, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { BoxDescricao, Container, Description, Title } from "./styles";

import img from "../../assets/onda.jpeg";

interface Props {
  title: string;
  data?: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

export function CardsEventos({
  data,
  title,
  description,
  image,
  url,
  type,
}: Props) {
  const [playing, setPlaying] = useState(false);

  console.log(image, type);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  return (
    <Container>
      {type === "video" && (
        <View>
          <YoutubePlayer
            height={250}
            width={400}
            play={playing}
            videoId={url}
            onChangeState={onStateChange}
          />
        </View>
      )}

      {type === "image" && (
        <Image
          style={{ width: "100%", height: 200 }}
          resizeMode="stretch"
          source={{ uri: image }}
        />
      )}

      <BoxDescricao>
        <Title>{title}</Title>

        <Description>{description}</Description>
        <Description>{data}</Description>
      </BoxDescricao>
    </Container>
  );
}
