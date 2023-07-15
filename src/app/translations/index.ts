import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "./resources";
import { store } from "../store";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
        ...Object.entries(resources).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: {
                    translation: value,
                },
            }),
            {},
        ),
    },
    returnNull: false,
    lng: store.getState().auth.lang,
});

export default i18n.t;
