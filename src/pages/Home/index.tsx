/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize } from "react-native-modalize";

import Firebase from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Center, Image, Text } from "native-base";
import {
  BoxPlayer,
  BoxText,
  Container,
  Title,
  TitleDesciption,
} from "./styles";
import { useAuth } from "../../hooks/AuthContext";
import { Engajamento } from "../../Components/Engajamento";
import { sizeH, sizeW } from "../../utils";
import { ButtonFlutuante } from "../../Components/ButtonFlutuante";
import { Live } from "../AMD/Live";
import { Header } from "../../Components/Header";
import { ILive } from "../../dtos";
import fundo from "../../assets/fundo1-onda.png";
import theme from "../../global/styles/theme";

export function Home() {
  const modalRef = useRef<Modalize>(null);

  //* * ESTADOS ................................................................
  const { user } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState<ILive>(null);
  const [load, setLoad] = useState(true);
  const [activi, setActive] = useState(true);

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
      .onSnapshot((h) => {
        const ids = h.docs.map((i) => i.id);

        if (ids[0]) {
          ids.map((i) => {
            Firebase()
              .collection("live")
              .doc(i)
              .get()
              .then((p) => {
                const dc = p.data() as ILive;
                setData(dc);
              });
          });
        } else {
          setData(null);
        }
      });

    return () => load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActive(true);
      if (data) {
        setLoad(false);
      } else {
        setTimeout(() => {
          setActive(false);
        }, 5000);
      }
    }, [data])
  );

  // todo ......................................................................

  return (
    <Container>
      <Modalize ref={modalRef}>
        <Live closeModal={CloseModal} />
      </Modalize>

      <Header />

      {load ? (
        <Center mt="40%">
          {activi && <ActivityIndicator />}
          <Text
            fontFamily={theme.fonts.REGULAR}
            fontSize="xl"
            color={theme.colors.text[2]}
          >
            Fique atento para a proxima live
          </Text>
          <Box h={200}>
            <YoutubePlayer
              height={sizeH(0.6)}
              width={sizeW(0.7)}

              // onChangeState={onStateChange}
            />
          </Box>
        </Center>
      ) : (
        <>
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
        </>
      )}
      {user.adm && <ButtonFlutuante pres={OpenModal} />}

      <Engajamento />
    </Container>
  );
}
