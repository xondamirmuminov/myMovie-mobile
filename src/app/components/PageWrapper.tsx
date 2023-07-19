import React from "react";
import { Dimensions, View, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "native-base";
import { colors } from "../theme/variables";

interface IPageWrapperProps {
    children: any;
    bg?: string;
    paddingH?: number | string;
    height?: string | number;
    safeAreaViewColor?: string;
    style?: any
}

const PageWrapper = ({
    children,
    bg,
    paddingH,
    height,
    safeAreaViewColor,
    style
}: IPageWrapperProps) => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: safeAreaViewColor || colors.white[100],
                flex: 1,
            }}
        >
            <ScrollView
                bg={bg ?? "white.100"}
                showsVerticalScrollIndicator={false}
                maxHeight={height}
                style={[styles.scrollView, { paddingHorizontal: paddingH ?? 18 }, style]}
            >
                <View style={styles.wrapper}>{children}</View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {},
    wrapper: {
        flex: 1,
        minHeight: Dimensions.get("window").height - 90,
    },
});

export default PageWrapper;
