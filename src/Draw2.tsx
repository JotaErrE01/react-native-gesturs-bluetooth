import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet, Text, SafeAreaView, ImageBackground, Image } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  Canvas,
  Circle,
  Path,
  Skia,
  ImageSVG,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';

interface IPath {
  segments: String[];
  color?: string;
}

interface ICircle {
  x: number;
  y: number;
}
interface IStamp {
  x: number;
  y: number;
  color: string;
}

enum Tools {
  Pencil,
  Stamp,
}

export default function Draw2() {
  // const { width, height } = Dimensions.get("window");

  // const paletteColors = ["red", "green", "blue", "yellow"];

  const svgStar =
    '<svg class="star-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" viewBox="0 0 200 200"><polygon id="star" fill="{{fillColor}}" points="100,0,129.38926261462365,59.54915028125263,195.10565162951536,69.09830056250526,147.55282581475768,115.45084971874736,158.77852522924732,180.90169943749473,100,150,41.2214747707527,180.90169943749476,52.447174185242325,115.45084971874738,4.894348370484636,69.09830056250527,70.61073738537632,59.549150281252636"></polygon></svg>';

  // const [activePaletteColorIndex, setActivePaletteColorIndex] = useState(0);
  // const [activeTool, setActiveTool] = useState<Tools>(Tools.Pencil);
  const [paths, setPaths] = useState<IPath[]>([]);
  const [circles, setCircles] = useState<ICircle[]>([]);
  const [stamps, setStamps] = useState<IStamp[]>([]);

  // When Reanimated is installed, Gesture Handler will try to run on the UI thread
  // We can't do that here because we're accessing the component state, so we need set runOnJS(true)
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: 'blue',
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
      // if (activeTool === Tools.Pencil) {
      // }
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
      // if (activeTool === Tools.Pencil) {
      // }
    })
    .onTouchesUp((g) => {
      const newPaths = [...paths];
      setPaths(newPaths);
      // if (activeTool === Tools.Pencil) {
      // }
    })
    .minDistance(1);

  // const tap = Gesture.Tap()
  //   .runOnJS(true)
  //   .onStart((g) => {
  //     if (activeTool === Tools.Stamp) {
  //       setStamps([
  //         ...stamps,
  //         {
  //           x: g.x - 25,
  //           y: g.y - 25,
  //           color: paletteColors[activePaletteColorIndex],
  //         },
  //       ]);
  //     }
  //   });

  const clearCanvas = () => {
    setPaths([]);
    setCircles([]);
    setStamps([]);
  };

  const clearLastPath = () => {
    const newPaths = [...paths];
    newPaths.pop();
    setPaths(newPaths);
  };

  // const paletteVisible = useSharedValue(false);
  // const animatedPaletteStyle = useAnimatedStyle(() => {
  //   return {
  //     top: withSpring(paletteVisible.value ? -275 : -100),
  //     height: withTiming(paletteVisible.value ? 200 : 50),
  //     opacity: withTiming(paletteVisible.value ? 100 : 0, { duration: 100 }),
  //   };
  // });

  // const animatedSwatchStyle = useAnimatedStyle(() => {
  //   return {
  //     top: withSpring(paletteVisible.value ? -50 : 0),
  //     height: paletteVisible.value ? 0 : 50,
  //     opacity: withTiming(paletteVisible.value ? 0 : 100, { duration: 100 }),
  //   };
  // });

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* <View
        style={{
          alignItems: 'center',
          position: 'relative',
          backgroundColor: 'blue',
          flex: 1
        }}
      > */}
        <Image
          source={require('../assets/conauto.png')}
          style={{
            // width: '30%',
            // height: 50,
            position: 'absolute',
            top: 20,
            right: 50,
            zIndex: 100,
            opacity: .5,
          }}
        />
      {/* </View> */}

      <View
        style={{
          alignItems: 'center',
          bottom: 0,
          display: paths.length ? 'none' : 'flex',
          flex: 1,
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <Text
          style={{
            color: 'rgba(0, 0, 0, 0.3)',
            fontSize: 40,
            fontWeight: 'bold'
          }}
        >Firme Aquí</Text>
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* <GestureDetector gesture={tap}> */}
          <GestureDetector gesture={pan}>
            <Canvas style={{ flex: 8 }}>
              {circles.map((c, index) => (
                <Circle key={index} cx={c.x} cy={c.y} r={10} />
              ))}
              {paths.map((p, index) => (
                <Path
                  key={index}
                  path={p.segments.join(" ")}
                  strokeWidth={5}
                  style="stroke"
                  color={'blue'}
                />
              ))}
              {stamps.map((s, index) => {
                const image = Skia.SVG.MakeFromString(
                  svgStar.replace("{{fillColor}}", s.color)
                );
                if (!image) return null;
                return (
                  <ImageSVG
                    key={index}
                    width={50}
                    height={50}
                    x={s.x}
                    y={s.y}
                    svg={image}
                  />
                );
              })}
            </Canvas>
          </GestureDetector>
          {/* </GestureDetector> */}

          {/* <View style={{ padding: 10, flex: 1, backgroundColor: "crimson" }}> */}
          {/* <View style={{ flex: 1, flexDirection: "row" }}> */}
          {/* <Animated.View
                style={[
                  { padding: 10, position: "absolute", width: 60 },
                  animatedPaletteStyle,
                ]}
              >
                {paletteColors.map((c, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setActivePaletteColorIndex(i);
                      paletteVisible.value = false;
                    }}
                  >
                    <View
                      style={[
                        {
                          backgroundColor: c,
                        },
                        styles.paletteColor,
                      ]}
                    ></View>
                  </TouchableOpacity>
                ))}
              </Animated.View> */}

          {/* </View> */}
          {/* </View> */}

          <View style={[styles.swatchContainer, {
            borderRadius: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '80%',
            marginHorizontal: '10%',
            marginBottom: 15,
          }]}>
            {/* <TouchableOpacity
                  onPress={() => {
                    paletteVisible.value !== true
                      ? (paletteVisible.value = true)
                      : (paletteVisible.value = false);
                  }}
                >
                  <Animated.View
                    style={[
                      {
                        backgroundColor: paletteColors[activePaletteColorIndex],
                      },
                      styles.swatch,
                      animatedSwatchStyle,
                    ]}
                  />
                </TouchableOpacity> */}
            {/* <View>
                  {activeTool === Tools.Pencil ? (
                    <TouchableOpacity
                      onPress={() => setActiveTool(Tools.Stamp)}
                    >
                      <FontAwesome5
                        name="pencil-alt"
                        style={styles.icon}
                      ></FontAwesome5>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setActiveTool(Tools.Pencil)}
                    >
                      <FontAwesome5
                        name="stamp"
                        style={styles.icon}
                      ></FontAwesome5>
                    </TouchableOpacity>
                  )}
                </View> */}

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={clearCanvas}>
                <Ionicons
                  name="md-trash-outline"
                  style={styles.icon}
                ></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity onPress={clearLastPath}>
                <Ionicons
                  name="return-up-back-outline"
                  style={styles.icon}
                ></Ionicons>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => console.log('SAVING...')}>
              <Ionicons
                name="save-outline"
                style={styles.icon}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>


      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    marginHorizontal: 15,
  },
  paletteColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
    zIndex: 2,
  },
  // swatch: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   borderColor: "black",
  //   marginVertical: 5,
  //   zIndex: 1,
  // },
  swatchContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});