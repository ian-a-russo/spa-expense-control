/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { defaultLight, modern, defaultDark } from "./make-themes";
import { Icon } from "@iconify/vue";

export default createVuetify({
  icons: {
    defaultSet: "iconify",
    sets: {
      iconify: {
        component: Icon,
      },
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          ...defaultLight,
          ...modern,
        },
      },
      dark: {
        colors: {
          ...defaultDark,
          ...modern,
        },
      },
    },
  },
  defaults: {
    VDataTableServer: {
      VBtn: {
        variant: "tonal",
        size: "35px",
        rounded: "xl",
        class: "text-none mx-1 hover-lg",
      },
      VIcon: {
        size: "20px",
      },
    },
    VListIcon: {
      rounded: "xl",
      class: "text-none",
    },
    VBtn: {
      rounded: "lg",
      class: "text-none hover-md",
    },
    VCard: {
      color: "surface",
      rounded: "lg",
    },
    VDialog: {
      rounded: "lg",
      VBtn: {
        class: "text-none mx-1 hover-sm",
      },
      VCard: {
        color: "surface",
        rounded: "none",
      },
    },
    VSheet: {
      VBtn: {
        class: "text-none mx-1 hover-xs",
      },
    },
    VToolbar: {
      color: "surface",
    },
    VSelect: {
      "item-class": "bg-surface",
      variant: "outlined",
    },
    VTooltip: {
      location: "left",
    },
    VAutocomplete: {
      variant: "outlined",
    },
    VTextField: {
      variant: "outlined",
    },
  },
});
