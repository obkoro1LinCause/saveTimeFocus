<template>
  <draggable
    v-model="list"
    item-key="id"
    :move="onMove"
    @end="onEnd"
    @start="onStart"
    @change="onChange"
    v-bind="dragOptions"
  >
    <template #item="{ element }">
      <div class="row-card">
        <div
          :id="element.id"
          :class="['row','level',{'hover':element.hover,'level-clicked':element.id == clickedId ? true:false}]" 
          @mouseenter.stop="onMouseenter(element)"
          @mouseleave.stop="onMouseleave(element)"
          @mousedown.stop="onMousedown(element)"
        >
          <div class="level-lt"  @click.stop="onClickEl(element)">
              <FolderOpenOutlined  v-if="element.show"/>
              <FolderOutlined v-else/>
            <span class="text-name">{{ element.name }}</span>
          </div>
          <div class="level-rt" >
            <a-dropdown @openChange="onCommand">
               <span class="count" v-if="!element.hover">1</span>
               <span class="more"  v-if="element.hover">···</span>
               <template #overlay>
                  <a-menu>
                    <a-menu-item key="edit">编辑</a-menu-item>
                    <a-menu-item key="edit">回收</a-menu-item>
                    <a-menu-item key="edit">归档</a-menu-item>
                    <a-menu-item key="edit">删除</a-menu-item>
                  </a-menu>
               </template>
            </a-dropdown>
          </div>
        </div>
        <tree-item
          :class="`item-sub-${element.rootType}`"
          v-model="element.elements"
          v-show="element.show && element.elements"
        ></tree-item>
      </div>
    </template>
  </draggable>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, computed, onMounted,defineEmits } from "vue";
import draggable from "vuedraggable";
import { FolderOutlined, FolderOpenOutlined } from  '@ant-design/icons-vue';

//全局被点击的id 放在store会不会好点
const  clickedId  = ref();
export default defineComponent({
  name: "BTreeItem",
  props: {
    moduleValue: {
      type: Object,
      required: true,
    },
    renderDragIcon:{
      type: Boolean,
      defalut:false
    },
    renderDragRow:{
      type: Boolean,
      defalut:false
    }
  },
  components: {
    draggable,
    FolderOutlined,
    FolderOpenOutlined
  },
  setup(props, ctx) {
    const dragOptions = computed(() => {
      return {
        group: "nested",
        disabled: false,
        ghostClass: "ghost-class",
        dragClass: "drag-class",
        fallbackOnBody: true,
        animation: 250,
        delay:50,
        chosenClass:'chosen-class'  //选中拖动元素的样式
      };
    });
    // 列表
    const list = computed(() => props.modelValue);
    const isDraging = ref(false);

    const onMove = (e) => {
      // treeType表示在第几层，type表示是清单还是文件夹
      const { draggedContext, to, relatedContext, from, dragged } = e;
      const { element: dragEl } = draggedContext;
      const { element: relateEl } = relatedContext;

      const toName = to.getAttribute("class");
      const fromName = from.getAttribute("class");

      if (dragEl && relateEl) {
        // 都是第一层
        if (dragEl.tier == 1 && relateEl.tier == 1) return true;
        // 都是第二层
        if (dragEl.tier == 2 && relateEl.tier == 2) return true;
        // 第二层但是文件 并且相邻是文件
        if (
          dragEl.tier == 2 &&
          dragEl.isFloder == 0 &&
          (!relateEl.isFloder || toName == fromName)
        ) {
          if (relateEl.tier === 3) dragEl.tier = 3;
          return true;
        }
        // 第三层 并且 相邻是文件或是第二层
        if (dragEl.tier == 3 && (relateEl.tier == 3 || relateEl.tier == 2)) {
          if (relateEl.tier == 2) dragEl.tier = 2;
          return true;
        }
      }
      if (!relateEl) {
        if (dragEl.tier == 2 && dragEl.isFloder == 0 && toName == fromName)
          return true;
      }
      return false;
    };
    const onEnd = (e)=>{
      isDraging.value = false;
    };
    const onChange = (e)=>{
      console.log(e,'--e---onChange')
    };
    // 开始拖地 要收起
    const onStart = (e)=>{
      isDraging.value = true;
      const {item,target,clone} = e;
      const { _underlying_vm_ } = item;
      _underlying_vm_.show = false;
    }
    const onClickEl = (element) => {
      clickedId.value = element.id;
      element.show = !element.show;
    };
    const onMouseenter = (element) => {
      element.hover = true;
    };
    const onMouseleave = (element) => {
      element.hover = false;
    };
    const onMousedown = (element)=>{
      
    };
    const onMore = ()=>{}
    const onCommand = (command,element)=>{
      console.log('command',command)
      // element.show = false
    }
    const onClickOutside =(element)=>{
       console.log('onClickOutside',element)
       element.hover = true;
    }

    onMounted(()=>{
      
    })

    return {
      dragOptions,
      list,
      isDraging,
      onMouseleave,
      onMouseenter,
      onMousedown,
      onClickEl,
      onMove,
      onEnd,
      onMore,
      onStart,
      onChange,
      clickedId,
      onCommand,
      onClickOutside
    };
  },
});
</script>


<style>
.row-card {
  height: auto;
  margin: 10px 5px;
}
.level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  border-radius: 3px;
}
.level:hover{
  cursor: pointer;
  background-color:#fafafa;
}
.level-clicked{
   background-color:#4772FA1A;
}

.level-lt {
  color: #191919;
  font-size: 14px;
  font-weight: 400;;
  width: calc(100% - 60px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count{
  color:#19191966;
  font-weight: 400;
  font-size:12px;
}
.more{
  color:#19191966;
  font-weight: bold;
  font-size:14px;
}

.level-rt {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
}

.drag-class {
  width: 100%;
  background-color: #ffffff !important;
  border-bottom:1px solid blue ;
}
.ghost-class {
  background-color: rgb(246, 247, 250) !important;
}
.chosen-class{
  height: 40px;
  overflow: hidden;
}
</style>
