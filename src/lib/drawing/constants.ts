export const TOOL_SETTINGS = {
  highlighter: {
    width: 15,
    color: '#98fb98',
    opacity: 0.5
  },
  pen: {
    width: 2,
    opacity: 1
  },
  eraser: {
    width: 20,
    opacity: 1
  }
} as const;

export const SNAP_THRESHOLD = 10; // pixels
export const MIN_SHAPE_SIZE = 5;