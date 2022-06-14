/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize } from "react-native-modalize";

import Firebase from "@react-native-firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Image,
  Modal,
  Text,
  Button as ButomBase,
} from "native-base";
import * as Updates from "expo-updates";
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
  const { dispatch } = useNavigation();
  const modalRef = useRef<Modalize>(null);

  //* * ESTADOS ................................................................
  const { user } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState<ILive>(null);
  const [load, setLoad] = useState(true);
  const [activi, setActive] = useState(true);

  const [showModalUpdates, setModalUpdates] = React.useState(false);

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

  //* UPDATES ................................................................
  const ChecUpdadeDevice = React.useCallback(async () => {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      setModalUpdates(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      ChecUpdadeDevice();
    }, [ChecUpdadeDevice])
  );

  const ReloadDevice = React.useCallback(async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }, []);

  return (
    <Container>
      <Modal isOpen={showModalUpdates} onClose={() => setModalUpdates(false)}>
        <Center p="10" bg={theme.colors.text[2]}>
          <Box>
            <Text color={theme.colors.text[1]}>
              UMA NOVA ATUALIZAÇÃO ESTA DISPONÍVEL
            </Text>
            <Text color={theme.colors.text[1]}>- melhorias no designer</Text>
            <Text color={theme.colors.text[1]}>vesion: 1.1.0</Text>
          </Box>
          <ButomBase onPress={ReloadDevice} mt="10">
            ATUALIZAR
          </ButomBase>
        </Center>
      </Modal>
      <Modalize ref={modalRef}>
        <Live closeModal={CloseModal} />
      </Modalize>

      <Header icon="menu" />

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
