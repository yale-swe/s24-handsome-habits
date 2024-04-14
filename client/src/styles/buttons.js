import { boldFont } from "./typography";

// Login Button styles
export const loginButton = {
  color: "white",
  fontSize: 20,
  borderRadius: 10,
  padding: 0,
};

export const buttonContent = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: 3,
};
export const buttonTextArea = {
  paddingEnd: 10,
};

export const habitButton = {
  padding: 10,
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  margin: 10,
  alignItems: "center",
  justifyContent: "center",
  width: 60,
  height: 60,
  bottom: 5,
};

export const shopButton = {
  width: 93,
  height: 45,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  ...boldFont
};

export const logButton = {
  color: "white",
  borderRadius: 10,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  width: 250,
  height: 50,
};

// export const backButton = {
//     color: "white",
//     padding: 10,
//     borderRadius: 10,
//     margin: 10,
//     alignItems: "center",
//     justifyContent: "center",
// };
export const backButton = {
  backgroundColor: "#0D3A4F",
  borderRadius: 5,
  margin: 10,
  width: 28,
  height: 29,
  color: "white",
  justifyContent: "center",
  alignItems: "center",
};

export const settingsButton = {
  backgroundColor: "#FFFFFF",
  padding: 5,
  borderRadius: 21,
  margin: 10,
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
};

export const coinsButton = {
  backgroundColor: "#FFFFFF",
  padding: 5,
  borderRadius: 10,
  margin: 10,
  width: 82,
  height: 37,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const purchaseButton = {
  backgroundColor: "#0D3A4F",
  borderRadius: 7,
  width: 75,
  height: 22,
  bottom: -3,
  left: 10,
  position: "absolute",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 3,
};

export const ownedButton = {
  backgroundColor: "#0D3A4F",
  borderRadius: 7,
  width: 75,
  height: 22,
  bottom: -3,
  left: 10,
  zIndex: 3,
  position: "absolute",
  flexDirection: "center",
  justifyContent: "center",
  alignItems: "center",
};
