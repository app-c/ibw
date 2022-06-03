import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize } from "react-native-modalize";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import Firestore from "@react-native-firebase/firestore";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Center } from "native-base";
import { Input } from "../../../Components/Input";
import help from "../../../assets/instrucao.png";

import {
  Box,
  BoxSelect,
  BoxVideo,
  Container,
  Select,
  TextHelp,
  Title,
  TitleModal,
  TitleSelect,
} from "./styles";
import { Buttom } from "../../../Components/Buttom";
import tuto from "../../../assets/tutorial.mp4";
import theme from "../../../global/styles/theme";

type Props = {
  closeModal: () => void;
};

export function Live({ closeModal }: Props) {
  const video = React.useRef(null);

  const [select, setSelect] = useState("video");
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = React.useState({});

  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");

  const modalizeRef = useRef<Modalize>(null);

  const handleSelect = useCallback((text: string) => {
    setSelect(text);
  }, []);

  useFocusEffect(
    useCallback(() => {
      modalizeRef.current?.open();
    }, [])
  );

  const handleCadastrar = useCallback(() => {
    setLoading(true);

    // if (descricao === "" && title === "") {
    //   return Alert.alert(
    //     "CADASTRO",
    //     "Vocẽ precisa fornecer um título e uma descrição"
    //   );
    // }

    Firestore()
      .collection("live")
      .get()
      .then((h) => {
        const ids = h.docs.map((p) => p.id);

        console.log(!ids[0]);

        if (!ids[0]) {
          Firestore().collection("live").add({
            title,
            descricao,
            video: url,
          });
        } else {
          ids.map((i) => {
            Firestore().collection("live").doc(i).update({
              title,
              descricao,
              video: url,
            });
          });
        }
      })

      .then(() => setLoading(false))
      .finally(() => closeModal());
  }, [closeModal, descricao, title, url]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    modalizeRef.current.close();
  }, []);

  return (
    <Container>
      <ScrollView
        style={{
          width: "100%",
          marginTop: 10,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingBottom: 100,
        }}
      >
        <Modalize ref={modalizeRef}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Center mt={10}>
              <Video
                style={{
                  width: 400,
                  height: 450,
                }}
                shouldPlay
                isMuted
                ref={video}
                source={tuto}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </Center>
            <TextHelp style={{ marginTop: 20 }}>
              Copiar o id do video conforme acima
            </TextHelp>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                marginTop: 8,
                backgroundColor: theme.colors.focus_second[1],
                borderRadius: 10,
                padding: 7,
              }}
            >
              <TitleModal>FECHAR</TitleModal>
            </TouchableOpacity>
          </View>
        </Modalize>
        <Title>CADASTRAR LIVE</Title>
        <Box>
          <Form>
            <Input
              onChangeText={(h) => setUrl(h)}
              value={url}
              name="url"
              type="custom"
              nome="Id do video"
            />
            <Input
              onChangeText={(h) => setTitle(h)}
              value={title}
              name="title"
              type="custom"
              nome="TÍTULO"
            />
            <Input
              onChangeText={(h) => setDescricao(h)}
              value={descricao}
              name="title"
              type="custom"
              nome="DESCRIÇÃO"
            />

            <BoxSelect>
              <TouchableOpacity
                onPress={() => {
                  handleSelect("video");
                  modalizeRef.current?.open();
                }}
              >
                <Select select={select === "video"}>
                  <TitleSelect select={select === "video"}>VIDEO</TitleSelect>
                </Select>
              </TouchableOpacity>
            </BoxSelect>

            <View style={{ marginTop: 20 }}>
              <BoxVideo>
                <Title>Preview</Title>
                <YoutubePlayer
                  height={250}
                  width={400}
                  play={playing}
                  videoId={url}
                  onChangeState={onStateChange}
                />
              </BoxVideo>
            </View>
          </Form>
        </Box>

        <View>
          <Buttom pres={handleCadastrar} nome="CADASTRAR" load={loading} />
        </View>
      </ScrollView>
    </Container>
  );
}
