<template>
    <div class="container calculator"> 
      <div class="row">
        <div class="col-12 result">
          <input type="text" readonly class="form-control-plaintext" id="result" v-model="result">
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

const ENTER_KEY_CODE = 13;

export default {
  components: {
    CalculatorKey
  },
  name: "app",
  created() {
    this.calculator = new Calculator({ debugMode: this.debug });
    document.addEventListener('keyup', this.enterKeyListener);
  },
  destroyed() {
    document.removeEventListener('keyup', this.enterKeyListener);
  },
  props: {
    debug: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      result: ''
    };
  },
  methods: {
    handleClick(key) {
      if (key === "=") {
        this.calculate();
        return;
      } else if (key === "AC") {
        this.reset();
        return;
      }
      this.calculator.handleInput(key);
      this.result = `${this.result} ${key}`;

    },
    calculate() {
      this.result = this.calculator.getResult();
    },
    reset() {
      this.calculator.reset();
      this.result = '';
    },
    enterKeyListener(evt) {
      // TODO: Could not get v-on:keyup.enter to work, probably since body is outside of Vue
      if (evt.keyCode === ENTER_KEY_CODE) {
        this.calculate();
      }
    }
  }
};
</script>
<style src="../assets/stylesheets/calculator.css"></style>