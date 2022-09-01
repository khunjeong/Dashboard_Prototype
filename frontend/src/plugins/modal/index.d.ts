type modalAnimation = "" | "up-down" | "down-up" | "left-right" | "right-left";

// this.$modal
export interface Modal {
  open: (
    component,
    props?,
    animation?: modalAnimation,
    callback?: Function
  ) => Promise<any>;
  activeIndex: number;
  refs: any[];
}

// this.destroy();
export type ModalDestroy = (res?) => void;
