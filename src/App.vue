<template>
  <Home />
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
