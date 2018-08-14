<template>
  <div>
    <div>
      one : 
      n: <input v-model.number="a.number" size="4"/>
      k: <input v-model.number="a.k" size="2"/>
      r: {{a.format()}}
    </div>

    <div>
      two : 
      n: <input v-model.number="b.number" size="4"/>
      k: <input v-model.number="b.k" size="2"/>
      r: {{b.format()}}
    </div>  

    <div>
      <button @click.prevent="add">+add</button>
      <button @click.prevent="dec">-dec</button>
      <button @click.prevent="mul">*mul</button>
      <button @click.prevent="div">/div</button>
    </div>

    <div>
      res : [ {{op}} ] = 
      [n: {{res.number}}] 
      [k: {{res.k}}] 
      [r: {{res.format()}}] 
      [num : {{res.num()}}]
    </div> 

    <div>
      <button @click.prevent="start">start</button>
      <button @click.prevent="end">end</button>
      <button @click.prevent="save">save</button>
      <button @click.prevent="showResetConfirm">reset</button>
      <br><button @click.prevent="checkLang">lang</button>

      <ui-confirm
        ref="resetConfirm"
        :title="$t('ui_reset_confirm_title')"
        :confirmButtonText="$t('ui_ok')"
        :denyButtonText="$t('ui_cancel')"
        @confirm="onConfirm"
        @deny="onDeny"
      >
        {{$t("ui_reset_confirm_text")}}
      </ui-confirm>
    </div>

  </div>
</template>


<script>
import MyNumber from "@/game/myNumber";

export default {
  data: function() {
    return {
      a: new MyNumber(),
      b: new MyNumber(),
      res: new MyNumber(),
      op: ""
    };
  },

  methods: {
    mul() {
      this.op = "*";
      this.res = this.a.mul(this.b);
    },
    div() {
      this.op = "/";
      this.res = this.a.div(this.b);
    },
    add() {
      this.op = "+";
      this.res = this.a.add(this.b);
    },
    dec() {
      this.op = "-";
      this.res = this.a.dec(this.b);
    },

    start() {
      this.$mainLoop.start();
    },
    end() {
      this.$mainLoop.stop();
    },
    save() {
      this.$game.save();
    },
    reset() {
      this.$game.reset();
    },

    showResetConfirm() {
      this.$refs["resetConfirm"].open();
    },

    onConfirm() {
      this.$game.reset();
    },

    onDeny() {
      console.log("deny reset");
    },

    checkLang() {
      var language = window.navigator.userLanguage || window.navigator.language;
      alert(language);
    }
  }
};
</script>
