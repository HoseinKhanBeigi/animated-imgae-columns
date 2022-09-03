export function debounce(func: any, wait: number) {
  let id: any;
  return (...args: [any]) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(
  minValue: number,
  maxValue: number,
  precision?: number
) {
  if (typeof precision == "undefined") {
    precision = 2;
  }
  return parseFloat(
    Math.min(
      minValue + Math.random() * (maxValue - minValue),
      maxValue
    ).toFixed(precision)
  );
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

export const calculatePathFour = (path: string, rect: any) => {
  const r = Math.sqrt(Math.pow(rect.height, 2) + Math.pow(rect.width, 2));
  const rInitialOuter = r;
  const rInitialInner = r;
  const rFinalOuter = r;
  const rFinalInner = (rect.width / 3) * getRandomFloat(0.2, 0.4);
  const getCenter = () =>
    `${getRandomInt(rFinalInner, rect.width - rFinalInner)}, ${getRandomInt(
      rFinalInner,
      rect.height - rFinalInner
    )}`;
  return path === "initial"
    ? `M ${rect.width / 2}, ${
        rect.height / 2
      } m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${
        rInitialOuter - rInitialInner
      } a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z`
    : `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${
        rFinalOuter - rFinalInner
      } a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
};

export const calculatePathFive = (path: string, rect: any) => {
  const frameSize = rect.width / 12;
  return path === "initial"
    ? `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`
    : `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${
        rect.width
      },0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize},${
        frameSize / 2
      } ${rect.width - frameSize - 100},${rect.height - frameSize / 3} ${
        frameSize + 50
      },${rect.height - frameSize - 30} Z`;
};

export const calculatePathSix = (path: string, rect: any) => {
  if (path === "initial") {
    return `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`;
  } else {
    const point1 = {
      x: rect.width / 4 - 50,
      y: rect.height / 4 + 50,
    };
    const point2 = {
      x: rect.width / 4 + 50,
      y: rect.height / 4 - 50,
    };
    const point3 = {
      x: rect.width - point2.x,
      y: rect.height - point2.y,
    };
    const point4 = {
      x: rect.width - point1.x,
      y: rect.height - point1.y,
    };

    return `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M ${point1.x},${point1.y} ${point2.x},${point2.y} ${point4.x},${point4.y} ${point3.x},${point3.y} Z`;
  }
};
