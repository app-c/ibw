import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Center, Image, Text, VStack } from "native-base";
import { CardsEventos } from "../../Components/CardsEventos";
import { INewsDto } from "../../dtos";
import { Box, Container, Title } from "./styles";
import theme from "../../global/styles/theme";
import { Header } from "../../Components/Header";
import fundo from "../../assets/fundo-onda.jpg";
import cartas1 from "../../assets/cartas1.jpeg";
import cartas2 from "../../assets/cartas2.jpeg";

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
      } else {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      }
    }, [news])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Image
          top={-10}
          opacity={0.6}
          position="absolute"
          source={fundo}
          alt="fund"
        />

        <Header />

        <ScrollView>
          <Box>
            <Text
              fontSize="lg"
              fontFamily={theme.fonts.Bold}
              color={theme.colors.text[2]}
            >
              FIQUE POR DENTRO DOS ENVENTOS
            </Text>
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
                <VStack>
                  <Image
                    source={cartas1}
                    alt="cartas1"
                    size="600"
                    resizeMode="contain"
                  />
                  <Image
                    source={cartas2}
                    alt="cartas1"
                    size="600"
                    resizeMode="contain"
                    mt={-20}
                  />
                </VStack>

                <FlatList
                  nestedScrollEnabled
                  style={{
                    marginTop: 0,
                  }}
                  contentContainerStyle={{
                    paddingBottom: 300,
                    marginTop: 100,
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
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}
