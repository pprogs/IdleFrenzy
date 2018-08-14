<template>
  <div id="app">    
    <ui-toolbar
      brand="Idle Frenzy"
      remove-brand-divider
      removeNavIcon
      text-color="white"
      type="colored"
      :raised="false"
    >
      <div slot="actions">

        <ui-icon-button
          color="white"
          has-dropdown
          icon="more_vert"
          ref="dropdownButton8"
          dropdownPosition="bottom right"
          size="large"
          type="secondary"
        >
          <ui-menu
            contain-focus
            has-icons
            slot="dropdown"
            :options="menuOptions"
            @close="$refs.dropdownButton8.closeDropdown()"
            @select="menuSelect"
          ></ui-menu>
        </ui-icon-button>
      </div>
    </ui-toolbar>

    <router-view/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      menuOptions: [
        {
          label: this.$t("ui_menu_game"),
          id: 1
        },
        {
          label: this.$t("ui_menu_about"),
          id: 2
        },
        {
          label: this.$t("ui_menu_settings"),
          id: 3
        },
        {
          label: this.$t("ui_menu_login"),
          id: 4
        }
      ]
    };
  },

  methods: {
    menuSelect(some) {
      switch (some.id) {
        case 1:
          this.$router.push("/");
          break;
        case 2:
          this.$router.push("/about");
          break;
        case 3:
          this.$router.push("/settings");
          break;
        case 4:
          this.$router.push("/login");
          break;
        default:
          this.$router.push("/");
      }
    }
  }
};
</script>


<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
  font-family: "Alegreya";
}

@media (min-width: 320px) and (max-width: 480px) {
  //CSS
  html {
    font-size: 80%;
  }
}

body {
  margin: 0px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
