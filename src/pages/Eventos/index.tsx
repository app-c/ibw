import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import Firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { CardsEventos } from "../../Components/CardsEventos";
import { INewsDto } from "../../dtos";
import { Box, Container, Title } from "./styles";
import theme from "../../global/styles/theme";
import { Header } from "../../Components/Header";

export function Eventos() {
  const [news, setNews] = useState<INewsDto[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    Firestore()
      .collection("news")
      .onSnapshot((h) => {
        const data = h.docs.map((p) => {
          return {
            id: p.id,
            ...p.data(),
          } as INewsDto;
        });

        setNews(data);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (news.length !== 0) {
        setLoad(false);
      }
    }, [news])
  );

  return (
    <Container>
      <Header />

      <Box>
        <Title>FIQUE POR DENTRO DOS ENVENTOS</Title>
        {load ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <Title>AINDA NAO TEMOS UM EVENTO ROLANDO</Title>
            <ActivityIndicator size="large" color={theme.colors.text[2]} />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              data={news}
              keyExtractor={(h) => h.id}
              renderItem={({ item: h }) => (
                <View>
                  <CardsEventos
                    title={h.title}
                    description={h.descricao}
                    type={h.type}
                    image={h.image}
                    url={h.video}
                  />
                </View>
              )}
            />
          </View>
        )}
      </Box>
    </Container>
  );
}
