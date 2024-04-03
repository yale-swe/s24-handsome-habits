export const defaultFont = { fontFamily: "OpenSans-Regular" };
export const boldFont = { fontFamily: "OpenSans-Bold" };
export const semiBoldFont = { fontFamily: "OpenSans-SemiBold" };
export const passion = { fontFamily: "PassionOne-Regular" };
export const passionBold = { fontFamily: "PassionOne-Bold" };
export const boldItalic = { fontFamily: "OpenSans-BoldItalic", fontSize: 28 };

export const header1 = {
    fontSize: 70,
    color: "#000",
    textAlign: "center",
    ...boldFont
};

export const header3 = {
    fontSize: 36,
    textAlign: "center",
    ...boldFont,
};

export const header4 = {
    fontSize: 20,
    textAlign: "center",
    ...boldFont,
};

export const message = {
    fontSize: 15,
    textAlign: "center",
    // fontStyle: "italic", it looks like this might not have an italic font
    ...boldFont,
};

export const coins = {
    fontSize: 15,
    textAlign: "center",
    color: "#FFB706",
};

export const buttonText = {
    color: "white",
    fontSize: 20,
    ...boldFont,
};