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

export function News() {
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

  const handleSelectImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const fileName = new Date().getTime();
    const reference = storage().ref(`/image/${fileName}.png`);

    await reference.putFile(result.uri);
    const photoUrl = await reference.getDownloadURL();
    setImageUrl(photoUrl);
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

    if (select === "image" && imageUrl === "") {
      setLoading(false);
      return Alert.alert("CADASTRO", "Você precisa selecionar uma image");
    }
    Firestore()
      .collection("news")
      .add({
        title,
        descricao,
        type: select,
        video: url,
        image: imageUrl !== "" ? imageUrl : null,
      })
      .then(() => setLoading(false));
  }, [descricao, imageUrl, select, title, url]);

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

              <TouchableOpacity onPress={() => handleSelect("image")}>
                <Select select={select === "image"}>
                  <TitleSelect select={select === "image"}>IMAGE</TitleSelect>
                </Select>
              </TouchableOpacity>
            </BoxSelect>

            {select === "video" && (
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
                      <TextHelp>
                        Copiar o id do video conforme a imagem
                      </TextHelp>
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
            )}

            {select === "image" && (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 36,
                }}
              >
                <Buttom
                  load={loading}
                  pres={handleSelectImage}
                  nome="Selecionar imagem"
                />

                <Image
                  style={{ width: 200, height: 150, marginTop: 16 }}
                  source={{ uri: image }}
                />
              </View>
            )}
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
