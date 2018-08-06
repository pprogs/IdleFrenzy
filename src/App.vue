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
          label: "Game"
        },
        {
          label: "About"
        },
        {
          label: "Settings"
        },
        {
          label: "Login"
        }
      ]
    };
  },

  methods: {
    menuSelect(some) {
      if (some.label === "About") {
        this.$router.push("/about");
      } else {
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
