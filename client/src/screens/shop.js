import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Border, FontFamily, FontSize, Color } from "./s_style.js";

const Shop = () => {
  return (
    <View style={styles.shop}>
      <View style={[styles.rectangleParent, styles.rectanglePosition]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={[styles.pants, styles.topsTypo]}>pants</Text>
      </View>
      <View style={[styles.rectangleGroup, styles.rectanglePosition]}>
        <View style={[styles.groupItem, styles.groupItemBg]} />
        <Text style={[styles.tops, styles.topsTypo]}>tops</Text>
      </View>
      <View style={[styles.rectangleContainer, styles.rectanglePosition]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={styles.extra}>extra</Text>
      </View>
      <View style={[styles.shopChild, styles.groupItemBg]} />
      <Pressable style={styles.home} onPress={() => {}}>
        <View style={styles.homeChild} />
        <Text style={styles.text}>"</Text>
      </Pressable>
      <View style={styles.clothesWrapper}>
        <View style={styles.clothes}>
          <View style={[styles.clothesInner, styles.clothesInnerPosition7]}>
            <View style={[styles.groupView, styles.clothesInnerPosition7]}>
              <View style={[styles.rectangleView, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork4Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>200</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesChild, styles.clothesInnerPosition6]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild2, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner1, styles.clothesInnerPosition6]}>
            <View
              style={[styles.rectangleParent2, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild4, styles.groupChildLayout1]} />
              <View style={[styles.groupChild5, styles.groupChildLayout]} />
              <Image
                style={styles.untitledArtwork32Icon}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text3, styles.textTypo]}>300</Text>
              <Image
                style={[styles.coin1Icon2, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner2, styles.clothesInnerPosition6]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner3, styles.clothesInnerPosition5]}>
            <View style={[styles.groupView, styles.clothesInnerPosition7]}>
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork4Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>200</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner4, styles.clothesInnerPosition5]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild2, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner5, styles.clothesInnerPosition5]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner6, styles.clothesInnerPosition4]}>
            <View style={[styles.groupView, styles.clothesInnerPosition7]}>
              <View style={[styles.rectangleView, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork4Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>200</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner7, styles.clothesInnerPosition3]}>
            <View style={[styles.groupView, styles.clothesInnerPosition7]}>
              <View style={[styles.rectangleView, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork4Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>200</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner8, styles.clothesInnerPosition2]}>
            <View style={[styles.groupView, styles.clothesInnerPosition7]}>
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork4Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>200</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner9, styles.clothesInner9Layout]}>
            <View
              style={[styles.rectangleParent10, styles.clothesInner9Layout]}
            >
              <View style={[styles.groupChild20, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon2,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.wearing, styles.textTypo]}>wearing!</Text>
            </View>
          </View>
          <View style={[styles.clothesInner10, styles.clothesInnerPosition4]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild22, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner11, styles.clothesInnerPosition1]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild22, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner12, styles.clothesInnerPosition]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild2, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                // eslint-disable-next-line max-lines
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner13, styles.clothesInnerPosition3]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild22, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner14, styles.clothesInnerPosition2]}>
            <View
              style={[styles.rectangleParent1, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild2, styles.groupChildLayout1]} />
              <View style={[styles.groupChild3, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork12Icon,
                  styles.untitledIconLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text2, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon1, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner15, styles.clothesInnerPosition1]}>
            <View
              style={[styles.rectangleParent2, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild32, styles.groupChildLayout1]} />
              <View style={[styles.groupChild5, styles.groupChildLayout]} />
              <Image
                style={styles.untitledArtwork32Icon}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text3, styles.textTypo]}>300</Text>
              <Image
                style={[styles.coin1Icon2, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner16, styles.clothesInnerPosition]}>
            <View
              style={[styles.rectangleParent2, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild4, styles.groupChildLayout1]} />
              <View style={[styles.groupChild5, styles.groupChildLayout]} />
              <Image
                style={styles.untitledArtwork32Icon}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text3, styles.textTypo]}>300</Text>
              <Image
                style={[styles.coin1Icon2, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner17, styles.clothesInnerPosition3]}>
            <View
              style={[styles.rectangleParent2, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild32, styles.groupChildLayout1]} />
              <View style={[styles.groupChild5, styles.groupChildLayout]} />
              <Image
                style={styles.untitledArtwork32Icon}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text3, styles.textTypo]}>300</Text>
              <Image
                style={[styles.coin1Icon2, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner18, styles.clothesInnerPosition2]}>
            <View
              style={[styles.rectangleParent2, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild4, styles.groupChildLayout1]} />
              <View style={[styles.groupChild5, styles.groupChildLayout]} />
              <Image
                style={styles.untitledArtwork32Icon}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text3, styles.textTypo]}>300</Text>
              <Image
                style={[styles.coin1Icon2, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner19, styles.clothesInnerPosition7]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.rectangleView, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner20, styles.clothesInnerPosition4]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.rectangleView, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
          <View style={[styles.clothesInner21, styles.clothesInnerPosition1]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.owned, styles.textTypo]}>owned</Text>
            </View>
          </View>
          <View style={[styles.clothesInner22, styles.clothesInnerPosition]}>
            <View
              style={[styles.rectangleParent3, styles.clothesInnerPosition7]}
            >
              <View style={[styles.groupChild6, styles.groupChildLayout1]} />
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Image
                style={[
                  styles.untitledArtwork2Icon,
                  styles.untitledIconPosition,
                ]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>100</Text>
              <Image
                style={[styles.coin1Icon, styles.coin1IconLayout]}
                resizeMode="cover"
                source={require("../assets/images/bulldog.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectanglePosition: {
    height: 45,
    top: 105,
    position: "absolute",
  },
  groupLayout: {
    borderRadius: Border.br_3xs,
    top: 0,
    left: 0,
    height: 45,
    width: 93,
  },
  topsTypo: {
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    left: 17,
    top: 5,
    position: "absolute",
  },
  groupItemBg: {
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  clothesInnerPosition7: {
    height: 92,
    top: 0,
    position: "absolute",
  },
  groupChildLayout1: {
    width: 87,
    height: 92,
    borderRadius: Border.br_8xs,
    top: 0,
    position: "absolute",
  },
  groupChildLayout: {
    height: 21,
    borderBottomLeftRadius: Border.br_8xs,
    borderBottomRightRadius: Border.br_8xs,
    top: 71,
    width: 87,
    backgroundColor: Color.colorDarkslategray,
    position: "absolute",
  },
  untitledIconPosition: {
    height: 50,
    top: 13,
    left: 0,
    position: "absolute",
  },
  textTypo: {
    height: 14,
    fontSize: FontSize.size_3xs,
    color: Color.colorWhite,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  coin1IconLayout: {
    height: 12,
    width: 14,
    top: 76,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  clothesInnerPosition6: {
    top: 762,
    height: 92,
    position: "absolute",
  },
  untitledIconLayout: {
    height: 60,
    width: 85,
    top: 8,
    position: "absolute",
  },
  clothesInnerPosition5: {
    top: 651,
    height: 92,
    position: "absolute",
  },
  clothesInnerPosition4: {
    top: 327,
    height: 92,
    position: "absolute",
  },
  clothesInnerPosition3: {
    top: 218,
    height: 92,
    position: "absolute",
  },
  clothesInnerPosition2: {
    top: 545,
    height: 92,
    position: "absolute",
  },
  clothesInner9Layout: {
    width: 88,
    height: 92,
    top: 0,
    position: "absolute",
  },
  clothesInnerPosition1: {
    top: 109,
    height: 92,
    position: "absolute",
  },
  clothesInnerPosition: {
    top: 436,
    height: 92,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorCornsilk,
    position: "absolute",
  },
  pants: {
    width: 58,
    color: Color.colorDarkslategray,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    left: 17,
    top: 5,
  },
  rectangleParent: {
    left: 143,
    width: 93,
    height: 45,
    top: 105,
  },
  groupItem: {
    borderRadius: Border.br_3xs,
    top: 0,
    left: 0,
    height: 45,
    width: 93,
  },
  tops: {
    color: "#000",
    width: 59,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    left: 17,
    top: 5,
  },
  rectangleGroup: {
    left: 43,
    width: 93,
    height: 45,
    top: 105,
  },
  extra: {
    top: 8,
    width: 94,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    left: 0,
    position: "absolute",
  },
  rectangleContainer: {
    left: 253,
    width: 94,
    height: 45,
    top: 105,
  },
  shopChild: {
    top: 138,
    left: 20,
    borderRadius: 15,
    width: 349,
    height: 675,
  },
  homeChild: {
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_8xs,
    height: 29,
    width: 28,
    left: 0,
    top: 0,
    position: "absolute",
  },
  text: {
    left: 7,
    fontSize: 25,
    fontFamily: FontFamily.passionOneRegular,
    color: Color.colorWhite,
    textAlign: "center",
    top: 0,
    position: "absolute",
  },
  home: {
    top: 25,
    height: 29,
    width: 28,
    left: 29,
    position: "absolute",
  },
  rectangleView: {
    backgroundColor: Color.colorGainsboro,
    width: 87,
    left: 5,
  },
  groupChild1: {
    left: 4,
  },
  untitledArtwork4Icon: {
    width: 94,
  },
  text1: {
    left: 46,
    width: 20,
    height: 14,
    fontSize: FontSize.size_3xs,
    top: 75,
  },
  coin1Icon: {
    left: 29,
    height: 12,
    width: 14,
    top: 76,
  },
  groupView: {
    width: 94,
    left: 0,
  },
  clothesInner: {
    left: 100,
    width: 94,
  },
  groupChild2: {
    left: 1,
    backgroundColor: Color.colorCornsilk,
  },
  groupChild3: {
    left: 0,
  },
  untitledArtwork12Icon: {
    left: 1,
  },
  text2: {
    left: 42,
    width: 20,
    height: 14,
    fontSize: FontSize.size_3xs,
    top: 75,
  },
  coin1Icon1: {
    left: 25,
  },
  rectangleParent1: {
    width: 89,
    left: 0,
  },
  clothesChild: {
    width: 89,
    left: 201,
  },
  groupChild4: {
    left: 2,
    backgroundColor: Color.colorCornsilk,
  },
  groupChild5: {
    left: 1,
  },
  untitledArtwork32Icon: {
    top: 11,
    width: 86,
    height: 55,
    left: 0,
    position: "absolute",
  },
  text3: {
    width: 20,
    height: 14,
    fontSize: FontSize.size_3xs,
    top: 75,
    left: 43,
  },
  coin1Icon2: {
    left: 26,
  },
  rectangleParent2: {
    width: 90,
    left: 0,
  },
  clothesInner1: {
    width: 90,
    left: 4,
  },
  groupChild6: {
    left: 5,
    backgroundColor: Color.colorCornsilk,
  },
  untitledArtwork2Icon: {
    width: 95,
  },
  rectangleParent3: {
    width: 95,
    left: 0,
  },
  clothesInner2: {
    width: 95,
    left: 98,
  },
  clothesInner3: {
    left: 98,
    width: 94,
  },
  clothesInner4: {
    left: 3,
    width: 89,
  },
  clothesInner5: {
    left: 197,
    width: 95,
  },
  clothesInner6: {
    left: 97,
    width: 94,
  },
  clothesInner7: {
    width: 94,
    left: 0,
  },
  clothesInner8: {
    left: 1,
    width: 94,
  },
  groupChild20: {
    backgroundColor: "#cbe7f3",
    left: 0,
  },
  untitledArtwork12Icon2: {
    left: 0,
  },
  wearing: {
    left: 19,
    width: 47,
    fontSize: FontSize.size_3xs,
    height: 14,
    top: 75,
  },
  rectangleParent10: {
    left: 0,
  },
  clothesInner9: {
    left: 6,
  },
  groupChild22: {
    left: 1,
    backgroundColor: Color.colorGainsboro,
    width: 87,
  },
  clothesInner10: {
    left: 2,
    width: 89,
  },
  clothesInner11: {
    width: 89,
    left: 201,
  },
  clothesInner12: {
    left: 202,
    width: 89,
  },
  clothesInner13: {
    width: 89,
    left: 100,
  },
  clothesInner14: {
    left: 101,
    width: 89,
  },
  groupChild32: {
    left: 2,
    backgroundColor: Color.colorGainsboro,
    width: 87,
  },
  clothesInner15: {
    width: 90,
    left: 4,
  },
  clothesInner16: {
    width: 90,
    left: 5,
  },
  clothesInner17: {
    left: 200,
    width: 90,
  },
  clothesInner18: {
    width: 90,
    left: 201,
  },
  clothesInner19: {
    left: 199,
    width: 95,
  },
  clothesInner20: {
    left: 196,
    width: 95,
  },
  owned: {
    top: 74,
    left: 28,
    width: 39,
    fontSize: FontSize.size_3xs,
    height: 14,
  },
  clothesInner21: {
    width: 95,
    left: 98,
  },
  clothesInner22: {
    left: 99,
    width: 95,
  },
  clothes: {
    top: 16,
    left: 8,
    width: 294,
    height: 854,
    position: "absolute",
  },
  clothesWrapper: {
    top: 154,
    left: 39,
    width: 316,
    height: 624,
    position: "absolute",
  },
  shop: {
    backgroundColor: "#fbcd5a",
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default Shop;
