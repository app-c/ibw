import React, { useCallback, useRef, useState } from "react";
import { Alert, Button, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize, ModalizeProps } from "react-native-modalize";

import { BoxPlayer, BoxText, Container, Logo, Title } from "./styles";
import { useAuth } from "../../hooks/AuthContext";
import { Engajamento } from "../../Components/Engajamento";
import { sizeH, sizeW } from "../../utils";
import { ButtonFlutuante } from "../../Components/ButtonFlutuante";
import { Live } from "../AMD/Live";
import { Header } from "../../Components/Header";

export function Home() {
  const modalRef = useRef<Modalize>(null);

  //* * ESTADOS ................................................................
  const { user } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  //* * ........................................................................

  // todo FUNÇÕES ..............................................................

  const OpenModal = useCallback(() => {
    modalRef.current?.open();
  }, []);

  const CloseModal = useCallback(() => {
    modalRef.current.close();
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  // todo ......................................................................

  return (
    <Container>
      {user.adm && <ButtonFlutuante pres={OpenModal} />}

      <Modalize ref={modalRef}>
        <Live closeModal={CloseModal} />
      </Modalize>

      <Header />

      <BoxPlayer>
        <YoutubePlayer
          height={sizeH(0.3)}
          width={sizeW(1)}
          videoId="nTb46ahOlTA"
          onChangeState={onStateChange}
        />
        <BoxText>
          <Title>Título</Title>
          <Title>descrição</Title>
        </BoxText>
      </BoxPlayer>

      <Engajamento />
    </Container>
  );
}
