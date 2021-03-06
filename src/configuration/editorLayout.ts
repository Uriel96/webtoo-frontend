import LeftLayout from '@/components/LeftLayout.vue';
import DesignTab from '@/components/DesignTab.vue';
import { Pane } from '@/models';

export const defaultLayoutStructure: Pane = {
  entryId: 'main',
  structure: {
    main: {
      orientation: 'vertical',
      components: ['leftPane', 'rightPane'],
    },
    leftPane: {
      default: 40,
      min: 0,
      max: 80,
      opened: true,
      component: LeftLayout,
    },
    rightPane: {
      default: 60,
      opened: true,
      component: DesignTab,
    },
  },
};
