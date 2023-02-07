<template>
  <NavLink :to="to" :class="mode">
    <slot />
  </NavLink>
</template>

<script>
export default {
  props: ["to", "mode"],
};
</script>
