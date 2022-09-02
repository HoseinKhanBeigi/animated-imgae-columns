export function debounce(func: any, wait: number) {
  let id: any;
  return (...args: [any]) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const calculatePath = (path: string, rect: any) => {
  const frameSize = rect.width / 12;
  return path === "initial"
    ? `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`
    : `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${
        rect.width - frameSize
      },${frameSize} ${rect.width - frameSize},${
        rect.height - frameSize
      } ${frameSize},${rect.height - frameSize} Z`;
};

export const calculatePathTwo = (path: string, rect: any) => {
  const frameSize = rect.width / 12;
  if (path === "initial") {
    return `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`;
  } else {
    return {
      next: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize},${
        frameSize / 2
      } ${rect.width - frameSize},${rect.height - frameSize / 2} ${frameSize},${
        rect.height - frameSize
      } Z`,
      prev: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize / 2} ${
        rect.width - frameSize
      },${frameSize} ${rect.width - frameSize},${
        rect.height - frameSize
      } ${frameSize},${rect.height - frameSize / 2} Z`,
    };
  }
};

export const calculatePathThree = (path: string, rect: any) => {
  const frameSize = rect.width / 12;
  if (path === "initial") {
    return `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`;
  } else {
    return {
      step1: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M ${frameSize},${frameSize} ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`,
      step2: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${
        rect.width - frameSize
      },${frameSize} ${rect.width},${rect.height} 0,${rect.height} Z`,
      step3: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${
        rect.width - frameSize
      },${frameSize} ${rect.width - frameSize},${rect.height - frameSize} 0,${
        rect.height
      } Z`,
      step4: `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${
        rect.width - frameSize
      },${frameSize} ${rect.width - frameSize},${
        rect.height - frameSize
      } ${frameSize},${rect.height - frameSize} Z`,
    };
  }
};
