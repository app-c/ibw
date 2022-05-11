import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Modalize } from "react-native-modalize";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import Firestore from "@react-native-firebase/firestore";
import { Input } from "../../../Components/Input";
import help from "../../../assets/instrucao.png";

import {
  Box,
  BoxSelect,
  BoxVideo,
  Container,
  ModalImage,
  Select,
  SelectButtomImage,
  TextHelp,
  Title,
  TitleModal,
  TitleSelect,
} from "./styles";
import { Buttom } from "../../../Components/Buttom";
import { Header } from "../../../Components/Header";

type Props = {
  closeModal: () => void;
};

export function Live({ closeModal }: Props) {
  const [select, setSelect] = useState("video");
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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

    if (descricao === "" && title === "") {
      return Alert.alert(
        "CADASTRO",
        "Vocẽ precisa fornecer um título e uma descrição"
      );
    }

    Firestore()
      .collection("live")
      .doc("mG87wxZlHsiqIoEL7l3p")
      .update({
        title,
        descricao,
        video: url,
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
          marginTop: 100,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingBottom: 100,
        }}
      >
        <Title>News</Title>
        <Box>
          <Form>
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
              <Modalize ref={modalizeRef}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <ModalImage source={help} />

                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={{ marginTop: 16 }}
                  >
                    <TextHelp>Copiar o id do video conforme a imagem</TextHelp>
                    <TitleModal>FECHAR</TitleModal>
                  </TouchableOpacity>
                </View>
              </Modalize>
              <Input
                onChangeText={(h) => setUrl(h)}
                value={url}
                name="url"
                type="custom"
                nome="Id do video"
              />
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

        {title !== "" && descricao !== "" && (
          <View>
            <Buttom pres={handleCadastrar} nome="CADASTRAR" load={loading} />
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
