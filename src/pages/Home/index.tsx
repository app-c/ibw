import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize, ModalizeProps } from "react-native-modalize";

import Firebase from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import {
  BoxPlayer,
  BoxText,
  Container,
  Logo,
  Title,
  TitleDesciption,
} from "./styles";
import { useAuth } from "../../hooks/AuthContext";
import { Engajamento } from "../../Components/Engajamento";
import { sizeH, sizeW } from "../../utils";
import { ButtonFlutuante } from "../../Components/ButtonFlutuante";
import { Live } from "../AMD/Live";
import { Header } from "../../Components/Header";

interface Props {
  descricao: string;
  title: string;
  video: string;
}

export function Home() {
  const modalRef = useRef<Modalize>(null);

  //* * ESTADOS ................................................................
  const { user } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState<Props>();
  const [load, setLoad] = useState(true);

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

  //! CHAMADA DA API
  useEffect(() => {
    const load = Firebase()
      .collection("live")
      .doc("mG87wxZlHsiqIoEL7l3p")
      .onSnapshot((h) => {
        const dc = h.data() as Props;

        setData(dc);
      });
    return () => load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        setLoad(false);
      }
    }, [data])
  );

  // todo ......................................................................

  return (
    <Container>
      {user.adm && <ButtonFlutuante pres={OpenModal} />}

      <Modalize ref={modalRef}>
        <Live closeModal={CloseModal} />
      </Modalize>

      <Header />

      {load ? (
        <ActivityIndicator />
      ) : (
        <BoxPlayer>
          <YoutubePlayer
            height={sizeH(0.3)}
            width={sizeW(1)}
            videoId={data.video}
            onChangeState={onStateChange}
          />
          <BoxText>
            <Title>{data.title}</Title>
            <TitleDesciption>{data.descricao}</TitleDesciption>
          </BoxText>
        </BoxPlayer>
      )}

      <Engajamento />
    </Container>
  );
}
