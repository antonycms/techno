<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from './pages/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
};
</script>

<style>
*,
button,
input {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-family: 'Noto Serif', serif;
}
html,
body {
  width: 100%;
}

body {
  background: linear-gradient(to right, #1a1a1a 30%, #fff 30%);
}

@media (max-width: 760px) {
  body {
    background: linear-gradient(to right, #1a1a1a 50%, #fff 50%);
  }
}
</style>
