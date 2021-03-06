<template>
  <container
    v-if="isSlotList"
    class="slot-container"
    :get-child-payload="getChildPayload"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @drop="onDrop"
    :should-accept-drop="shouldAcceptDrop"
    group-name="design"
  >
    <component-wrapper
      v-for="child in slotData.value"
      :key="child"
      :elementId="child"
      :componentId="componentId"
    />
  </container>
  <div v-else>{{ slotData.value }}</div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { Container } from 'vue-smooth-dnd';
import { DroppedResult, ElementInfo, ComponentInfo, SlotData } from '@/models';
import { get } from '@/utilities';

@Component({
  components: {
    'container': Container,
    'component-wrapper': () => import('@/components/ComponentWrapper.vue'),
  },
})
export default class SlotWrapper extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;
  @Prop() public slotData!: SlotData;

  get element() {
    return this.editor.getElement(this.componentId, this.elementId);
  }
  get isSlotList() {
    if (!this.slotInfo) {
      return false;
    }
    return this.slotInfo.type === 'list';
  }
  get slotInfo() {
    if (!this.element) {
      return;
    }
    const elementComponent = this.editor.getComponent(this.element.componentId);
    if (!elementComponent) {
      return;
    }
    return get(elementComponent.slots, this.slotData.id);
  }

  public getChildPayload(index: number) {
    return {
      componentId: this.slotData.value[index],
    };
  }

  public onDrop(dropResult: DroppedResult) {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex === null && addedIndex === null) {
      return;
    }
    if (!payload) {
      return;
    }
    const { componentId } = dropResult.payload;
    const newPayload = {
      draggedId: componentId,
      droppedId: this.elementId,
      slotId: this.slotData.id,
      removedIndex,
      addedIndex,
    };
    if (payload.type === 'component-info') {
      this.editor.addComponent(newPayload);
    } else {
      this.editor.switchComponent(newPayload);
    }
  }
  public onDragStart() {
    this.editor.setDraggingElement(true);
  }
  public onDragEnd() {
    this.editor.setDraggingElement(false);
  }
  public shouldAcceptDrop(sourceContainerOptions: any, payload: any) {
    return true;
  }
}
</script>

<style scoped>
.slot-container {
  padding: 5px;
  width: fit-content;
  float: left;
  display: block;
}
</style>
