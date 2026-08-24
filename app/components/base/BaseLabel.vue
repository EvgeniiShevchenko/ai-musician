<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    variant?: "default" | "danger" | "warning" | "success";
    size?: "sm" | "md";
    rounded?: boolean;
  }>(),
  {
    variant: "default",
    size: "md",
    rounded: true,
  }
);

const classes = computed(() => [
  {
    default: "bg-neutral-900 text-white border-neutral-700",
    danger: "bg-red-700 text-white border-red-500",
    warning: "bg-yellow-500 text-black border-yellow-400",
    success: "bg-emerald-700 text-white border-emerald-500",
  }[props.variant],

  {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }[props.size],

  props.rounded ? "rounded-full" : "rounded-md",
]);
</script>

<template>
  <span
    class="inline-flex items-center justify-center border font-semibold uppercase tracking-wide select-none"
    :class="classes"
  >
    {{ text }}
  </span>
</template>
