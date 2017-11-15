<template>
    <div class="container calculator"> 
      <div class="row">
        <div class="col-12 result">
          <input type="text" readonly class="form-control-plaintext" id="result" v-model="display">
        </div>
      </div>
      <div class="row">
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="AC"></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="("></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value=")"></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="/"></CalculatorKey>
      </div>
      <div class="row">
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="7"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="8"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="9"></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="*"></CalculatorKey>
      </div>
      <div class="row">
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="4"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="5"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="6"></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="-"></CalculatorKey>
      </div>
      <div class="row">
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="1"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="2"></CalculatorKey>
        <CalculatorKey class="col btn btn-secondary" @keySelected="handleClick" value="3"></CalculatorKey>
        <CalculatorKey class="col btn btn-primary" @keySelected="handleClick" value="+"></CalculatorKey>
      </div>
      <div class="row">
        <CalculatorKey class="col-6 btn btn-secondary" @keySelected="handleClick" value="0"></CalculatorKey>
        <CalculatorKey class="col-3 btn btn-secondary" @keySelected="handleClick" value="."></CalculatorKey>
        <CalculatorKey class="col-3 btn btn-primary" @keySelected="handleClick" value="="></CalculatorKey>
      </div>
    </div>
</template>

<script>
import CalculatorKey from "./CalculatorKey.vue";
import Calculator from "./Calculator.js";
import { digitKeyCodes, operatorKeyCodes } from "./KeyCodes.js";

export default {
  components: {
    CalculatorKey
  },
  name: "Calculator",
  created() {
    this.calculator = new Calculator({ debugMode: this.debug });
    document.addEventListener("keyup", this.keyListener);
  },
  destroyed() {
    document.removeEventListener("keyup", this.keyListener);
  },
  props: {
    debug: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      display: ""
    };
  },
  methods: {
    handleClick(key) {
      this.calculator.handleInput(key);
      this.display = this.calculator.display;
    },
    keyListener(evt) {
      let key;
      if (evt.keyCode in operatorKeyCodes) {
        for (let kc of operatorKeyCodes[evt.keyCode]) {
          if (evt.shiftKey === kc.shiftKeyPressed) {
            key = kc.key;
          }
        }
      }
      if (!key && evt.keyCode in digitKeyCodes) {
        key = digitKeyCodes[evt.keyCode];
      }
      if (key) {
        this.handleClick(key);
      }
    }
  }
};
</script>
<style src="../assets/stylesheets/calculator.css"></style>