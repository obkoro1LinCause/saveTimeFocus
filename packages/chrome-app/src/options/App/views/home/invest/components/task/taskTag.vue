<template>
  <div>
    <div class="mt-1 flex" v-if="tagType === 'total'">
      <template v-for="(item, index) in TTagOptions" :key="index">
        <Tooltip :title="item?.title">
          <a-tag
            :color="item.color"
            class="text-12px my-1"
            @click.stop="onClickTag(item.type)"
            v-if="item.show"
            >{{ item.label }}</a-tag
          >
        </Tooltip>
      </template>
    </div>
    <div class="mt-1 flex" v-if="!isChildTask && tagType === 'series'">
      <template v-for="(item, index) in STagOptions" :key="index">
        <Tooltip :title="item?.title">
          <a-tag
            :color="item.color"
            class="text-12px my-1"
            @click.stop="onClickTag(item.type)"
            v-if="item.show"
            >{{ item.label }}</a-tag
          >
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, computed } from "vue";
import { TTaskItemMap } from "./type";
import Tooltip from "@/options/App/component/tooltip.vue";

const props = defineProps({
  taskCard: {
    type: Object as PropType<TTaskItemMap>,
    required: true,
  },
});

// 是否是子任务
const isChildTask = computed(() => {
  return true;
});

const tagType = ref<"total" | "series">("total");
const TTagOptions = ref([
  {
    label: "已专注",
    value: "",
    type: "total",
    color: "green",
    title: "已专注x天，当前连续专注x天，最高连续专注x天",
    show: true,
  },
  {
    label: "已达标",
    value: "",
    type: "total",
    color: "red",
    title: "已达标x天，当前连续达标x天，最高连续达标x天",
    show: !isChildTask.value,
  },
  {
    label: "已投资",
    value: "",
    type: "total",
    color: "orange",
    title: "已投资x天，当前连续投资x天，最高连续投资x天",
    show: true,
  },
]);
const STagOptions = ref([
  {
    label: "连续专注x天",
    value: "",
    type: "series",
    color: "green",
    title: "已专注x天，当前连续专注x天，最高连续专注x天",
    show: true,
  },
  {
    label: "连续达标x天",
    value: "",
    type: "series",
    color: "cyan",
    title: "已达标x天，当前连续达标x天，最高连续达标x天",
    show: !isChildTask.value,
  },
  {
    label: "连续投资x天",
    value: "",
    type: "series",
    color: "blue",
    title: "已投资x天，当前连续投资x天，最高连续投资x天",
    show: true,
  },
]);

// 点击tag
const onClickTag = (type: "total" | "series") => {
  if (isChildTask.value) return;
  if (type === "total") {
    tagType.value = "series";
  } else {
    tagType.value = "total";
  }
};
</script>

<style lang="scss" scoped>
</style>

