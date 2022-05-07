import React, { useCallback, useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { Alert, Button, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import Firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Avatar,
  BoxPlayer,
  BoxText,
  Container,
  Header,
  Logo,
  Title,
} from "./styles";
import { useAuth } from "../../hooks/AuthContext";
import logo from "../../assets/logo.png";
import avatar from "../../assets/User.png";
import theme from "../../global/styles/theme";
import { Engajamento } from "../../Components/Engajamento";

export function Home() {
  const { signOut, user, updateUser } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useNavigation();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const handleProfile = useCallback(async () => {
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
    const reference = storage().ref(`/avatar/${fileName}.png`);

    await reference.putFile(result.uri);
    const photoUrl = await reference.getDownloadURL();

    Firestore()
      .collection("users")
      .doc(user.id)
      .update({
        avatar: photoUrl,
      })
      .then(() => Alert.alert("Avatar", "Pizza cadastrada com sucesso"))
      .catch(() => {
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza");
      })
      .finally(() => setLoading(false));
    setLoading(false);

    const upUser = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      avatar: photoUrl,
      adm: user.adm,
    };
    updateUser(upUser);
  }, [updateUser, user]);

  return (
    <Container>
      <Header>
        <Logo source={logo} />
        <Title
          style={{ marginRight: RFValue(100), color: theme.colors.text[2] }}
        >
          ITACOATIARA {"\n"}BIG WAVE
        </Title>
        <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
          <Feather
            name="menu"
            size={RFValue(40)}
            color={theme.colors.text[2]}
          />
        </TouchableOpacity>
      </Header>
      <BoxPlayer>
        <YoutubePlayer
          height={250}
          width={400}
          play={playing}
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
